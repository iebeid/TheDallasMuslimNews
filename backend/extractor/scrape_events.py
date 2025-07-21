import os
import csv
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
from datetime import datetime
import re
import json
from urllib.parse import urljoin

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from .models import Event

# --- Configuration ---
# Set this to the absolute or relative path to your data directory.
# This directory should contain your 'website_data.csv' and potentially
# any other data files or subdirectories related to scraping.
#
# Example: If your 'website_data.csv' is in 'TheDallasMuslimNews/backend/data/',
# set DATA_DIR = 'data/' (relative to manage.py)
# Or DATA_DIR = '/absolute/path/to/TheDallasMuslimNews/backend/data/'
ROOT_DIR = "G:/My Drive/Knowledge/Business/The Dallas Muslim News/Code/TheDallasMuslimNews/"


DATA_DIR = 'data/' # <--- CONFIGURE THIS PATH

# Path to the CSV file within the DATA_DIR
WEBSITE_DATA_CSV_FILENAME = 'urls/website_data.csv'

# Ensure your GOOGLE_API_KEY is set in your environment variables.
# For local development, you can add it to your .env file or directly here for testing (NOT recommended for production).
# os.environ['GOOGLE_API_KEY'] = 'YOUR_GOOGLE_API_KEY_HERE' # REMOVE IN PRODUCTION
GEMINI_MODEL_NAME = "gemini-1.5-pro"

# Initialize Gemma Model
try:
    genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))
    if not os.environ.get('GOOGLE_API_KEY'):
        print("Warning: GOOGLE_API_KEY environment variable not set. Gemma model may not function.")
    gemini_model = genai.GenerativeModel(GEMINI_MODEL_NAME)
except Exception as e:
    print(f"Error initializing Gemma model: {e}")
    gemini_model = None # Set to None if initialization fails


class Command(BaseCommand):
    help = 'Scrapes event information from specified URLs, extracts data using Gemma, and stores it in the database.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--data_dir',
            type=str,
            default=DATA_DIR,
            help='Path to the directory containing website_data.csv and other data files.'
        )
        parser.add_argument(
            '--csv_filename',
            type=str,
            default=WEBSITE_DATA_CSV_FILENAME,
            help='Filename of the CSV file containing URLs within the data directory.'
        )
        parser.add_argument(
            '--max_urls',
            type=int,
            default=None,
            help='Maximum number of URLs to process from the CSV.'
        )
        parser.add_argument(
            '--verbose',
            action='store_true',
            help='Enable verbose output for debugging.'
        )

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting event scraping process...'))

        configured_data_dir = options['data_dir']
        csv_filename = options['csv_filename']
        max_urls = options['max_urls']
        verbose = options['verbose']

        if not gemini_model:
            raise CommandError("Gemma model not initialized. Please ensure GOOGLE_API_KEY environment variable is set.")

        # Construct the full path to the CSV file
        from django.conf import settings
        # Use os.path.join for platform-independent path construction
        full_data_dir_path = os.path.join(settings.BASE_DIR, configured_data_dir)
        full_csv_file_path = os.path.join(full_data_dir_path, csv_filename)


        # Read URLs from the CSV file
        urls_to_scrape = []
        try:
            os.makedirs(full_data_dir_path, exist_ok=True) # Ensure data directory exists
            with open(full_csv_file_path, 'r', newline='', encoding='utf-8') as f:
                reader = csv.reader(f)
                for i, row in enumerate(reader):
                    if i == 0 and ('Text Content' in row or 'Image URL' in row): # Skip header row
                        continue
                    if row:
                        found_url = None
                        for item in row:
                            if 'http' in item.lower() and not item.startswith('/'):
                                found_url = item.strip()
                                break
                        if found_url:
                            urls_to_scrape.append(found_url)

                    if max_urls and len(urls_to_scrape) >= max_urls:
                        break
        except FileNotFoundError:
            raise CommandError(f"CSV file not found at: {full_csv_file_path}. Please ensure it's in the correct location or specify with --data_dir and --csv_filename.")
        except Exception as e:
            raise CommandError(f"Error reading CSV file: {e}")

        if not urls_to_scrape:
            self.stdout.write(self.style.WARNING("No valid URLs found in the CSV file to scrape."))
            return

        self.stdout.write(f"Found {len(urls_to_scrape)} URLs to process.")

        processed_count = 0
        for url in urls_to_scrape:
            if verbose:
                self.stdout.write(f"Processing URL: {url}")
            try:
                # Step 1: Scrape content
                response = requests.get(url, timeout=15)
                response.raise_for_status() # Raise HTTPError for bad responses (4xx or 5xx)
                soup = BeautifulSoup(response.content, 'html.parser')
                web_page_content = soup.prettify()

                # Step 2: Extract flyer images
                image_tags = soup.find_all('img')
                flyer_image_url = None
                for img in image_tags:
                    src = img.get('src')
                    if src:
                        # Basic check for common flyer/event keywords in URL or alt text
                        if ('flyer' in src.lower() or 'event' in src.lower() or 'poster' in src.lower() or
                            ('alt' in img.attrs and ('flyer' in img['alt'].lower() or 'event' in img['alt'].lower()))):
                            flyer_image_url = urljoin(url, src) # Make sure the URL is absolute
                            break # Found a potential flyer, take the first one

                # Step 3: Use Gemma model to extract event information
                prompt = f"""
                Extract the following event information from the provided HTML content.
                Provide the output as a JSON object with the following keys.
                If a field is not found, use null.

                HTML Content:
                ```html
                {web_page_content}
                ```

                JSON Output Format:
                {{
                    "event_id": "string",
                    "event_name": "string",
                    "event_description": "string",
                    "address": "string",
                    "phone": "string",
                    "start_time": "YYYY-MM-DD HH:MM:SS",
                    "end_time": "YYYY-MM-DD HH:MM:SS",
                    "fee": "string"
                }}
                """
                gemma_response = genai.GenerativeModel(GEMINI_MODEL_NAME).generate_content(prompt)

                # Extract JSON from Gemma's response, handling markdown code blocks
                json_match = re.search(r'```json\n(.*)\n```', gemma_response.text, re.DOTALL)
                if json_match:
                    json_data = json_match.group(1).strip()
                else:
                    json_data = gemma_response.text.strip()

                try:
                    extracted_data = json.loads(json_data)
                except json.JSONDecodeError:
                    self.stdout.write(self.style.ERROR(f"Could not decode JSON from Gemma for {url}. Raw: {json_data[:500]}..."))
                    continue

                extracted_data['url'] = url
                extracted_data['flyer_image_url'] = flyer_image_url

                # Convert time fields to datetime objects if present
                for time_field in ['start_time', 'end_time']:
                    if extracted_data.get(time_field) and extracted_data[time_field] != "null":
                        try:
                            parsed_dt = None
                            # Try common datetime formats. Add more if needed.
                            if re.match(r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}', extracted_data[time_field]):
                                parsed_dt = datetime.strptime(extracted_data[time_field], '%Y-%m-%d %H:%M:%S')
                            elif re.match(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?', extracted_data[time_field]):
                                parsed_dt = datetime.fromisoformat(extracted_data[time_field].replace('Z', '+00:00'))
                            extracted_data[time_field] = parsed_dt
                        except ValueError:
                            if verbose:
                                self.stdout.write(self.style.WARNING(
                                    f"Could not parse datetime for {time_field} in {url}: {extracted_data[time_field]}"
                                ))
                            extracted_data[time_field] = None
                    else:
                        extracted_data[time_field] = None

                # Save to Django database using update_or_create to handle new and existing events
                with transaction.atomic():
                    event, created = Event.objects.update_or_create(
                        url=extracted_data['url'], # Use URL as the unique identifier for update/create
                        defaults={
                            'event_id': extracted_data.get('event_id'),
                            'event_name': extracted_data.get('event_name', 'Unnamed Event'),
                            'event_description': extracted_data.get('event_description'),
                            'address': extracted_data.get('address'),
                            'phone': extracted_data.get('phone'),
                            'start_time': extracted_data.get('start_time'),
                            'end_time': extracted_data.get('end_time'),
                            'fee': extracted_data.get('fee'),
                            'flyer_image_url': extracted_data.get('flyer_image_url'),
                        }
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f"Successfully added new event: {event.event_name} ({url})"))
                    else:
                        self.stdout.write(self.style.HTTP_INFO(f"Successfully updated event: {event.event_name} ({url})"))

                processed_count += 1

            except requests.exceptions.RequestException as e:
                self.stdout.write(self.style.ERROR(f"Network error scraping {url}: {e}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error processing {url}: {e}"))

        self.stdout.write(self.style.SUCCESS(f"Finished scraping. Successfully processed {processed_count} URLs."))