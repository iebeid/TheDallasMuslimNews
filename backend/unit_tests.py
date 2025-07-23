import json
import os
import re
import time  # Import time for rate-limiting delay
from datetime import datetime

import google.generativeai as genai
import httpx  # Use httpx consistently for all network requests
from bs4 import BeautifulSoup

# --- Configuration for All Tests ---
# IMPORTANT: This script requires the GOOGLE_API_KEY to be set as an environment variable.
# Example (Windows CMD):   set GOOGLE_API_KEY="YOUR_API_KEY"
# Example (PowerShell):    $env:GOOGLE_API_KEY="YOUR_API_KEY"
# Example (Linux/macOS):   export GOOGLE_API_KEY="YOUR_API_KEY"

GEMINI_MODEL_NAME = "gemini-1.5-pro"

# --- Image Event Extraction Test Configuration ---
TEST_IMAGE_URL = "https://epicmasjid.org/wp-content/uploads/2023/09/WhatsApp-Image-2025-03-25-at-8.26.55-PM.jpeg"
# REFINED PROMPT: Asks for JSON directly in one step to reduce API calls and improve reliability.
IMAGE_EXTRACTION_PROMPT = """
Analyze the provided image of an event flyer. Extract the event information
and provide the output *only* as a single, clean JSON object without any markdown formatting, comments, or extra text.

The JSON object should have the following keys. If a value is not found, use null.
- event_name (string)
- event_description (string)
- address (string)
- phone (string)
- start_time (string, format: "YYYY-MM-DD HH:MM:SS")
- end_time (string, format: "YYYY-MM-DD HH:MM:SS")
- fee (string)
- url (string)
"""

# --- URL Scraping & AI Extraction Test Configuration ---
TEST_SCRAPE_URL = "https://www.irvingmasjid.org/"
URL_EXTRACTION_JSON_FORMAT = """
{{
    "event_name": "string",
    "event_description": "string",
    "address": "string",
    "start_time": "YYYY-MM-DD HH:MM:SS"
}}
"""

# --- Django ORM CRUD Test Configuration ---
ORM_TEST_EVENT_URL = "http://test.com/dummy-event-crud-unique/"
ORM_TEST_EVENT_ID_VAL = "test-event-123-crud-unique"
ORM_TEST_EVENT_NAME_VAL = "Test Event for CRUD Operations"
ORM_TEST_UPDATED_EVENT_NAME_VAL = "Updated Test Event Name for CRUD"
# --- End Configuration ---


# --- Django ORM Test Specific Imports and Setup ---
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TheDallasMuslimNews.settings')
import django

try:
    django.setup()
    from extractor.models import Event
    from django.utils.timezone import make_aware

    DJANGO_ORM_AVAILABLE = True
except Exception as e:
    print(f"Django ORM Test Warning: Could not set up Django environment for ORM test: {e}")
    print("Please ensure you are running this from your Django project root (where manage.py is) or check settings.")
    DJANGO_ORM_AVAILABLE = False
# --- End Django ORM Test Specific Setup ---


# Initialize Gemini Model for tests
try:
    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        raise ValueError("GOOGLE_API_KEY environment variable not set. Cannot run Gemini tests.")
    genai.configure(api_key=api_key)
    test_gemini_model = genai.GenerativeModel(GEMINI_MODEL_NAME)
except Exception as e:
    print(f"Error initializing Gemini model for tests: {e}")
    test_gemini_model = None


def test_image_event_extraction_smoke():
    """
    Smoke test for extracting event information from an image using Gemini.
    This version is optimized to use a single, more efficient API call.
    """
    print("\n--- Running Image Event Extraction Smoke Test ---")
    if not test_gemini_model:
        print("Skipping image test: Gemini model not initialized.")
        return False

    try:
        # Fetch image content directly using httpx
        image_response = httpx.get(TEST_IMAGE_URL)
        image_response.raise_for_status()
        image_content = image_response.content
        image_part = {'mime_type': 'image/jpeg', 'data': image_content}

        # Single, efficient API call with the refined prompt. No base64 needed.
        gemma_response = test_gemini_model.generate_content([IMAGE_EXTRACTION_PROMPT, image_part])

        # This robust regex finds the JSON block, even if it's wrapped in markdown or other text.
        match = re.search(r'\{.*\}', gemma_response.text, re.DOTALL)
        if not match:
            print(f"Image Event Extraction Test: FAILED - Could not find a JSON object in the AI response.")
            print(f"Raw response from AI: {gemma_response.text[:500]}...")
            return False

        json_text = match.group(0)
        try:
            data = json.loads(json_text)
            print("Image Event Extraction Test: PASSED")
            print("Extracted Data (first few items):")
            for key, value in list(data.items())[:3]:
                print(f"  {key}: {value}")
            return True
        except json.JSONDecodeError as e:
            print(f"Image Event Extraction Test: FAILED - JSON decode error: {e}")
            print(f"Attempted to parse: {json_text[:500]}...")
            return False

    except httpx.RequestError as e:
        print(f"Image Event Extraction Test: FAILED - Network error fetching image: {e}")
        return False
    except Exception as e:
        print(f"Image Event Extraction Test: FAILED - An unexpected error occurred: {e}")
        return False


def test_url_scraping_and_ai_extraction_smoke():
    """
    Smoke test for scraping a single URL and extracting event info via AI.
    """
    print("\n--- Running URL Scraping & AI Extraction Smoke Test ---")
    if not test_gemini_model:
        print("Skipping URL test: Gemini model not initialized.")
        return False

    try:
        # Using httpx for consistency
        response = httpx.get(TEST_SCRAPE_URL, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')

        # --- CRITICAL FIX: Extract clean text instead of raw HTML ---
        # This reduces noise and token count, fixing the "botched" prompt issue.
        if soup.body:
            main_content_text = soup.body.get_text(separator=' ', strip=True)
        else:
            main_content_text = soup.get_text(separator=' ', strip=True)
        # Limit content size to avoid exceeding token limits
        main_content_text = main_content_text[:20000]

        prompt = f"""
        Extract event information from the following web page text content.
        Provide the output *only* as a clean JSON object.
        If a field is not found, use null.

        Web Page Content:
        {main_content_text}

        JSON Output Format:
        {URL_EXTRACTION_JSON_FORMAT}
        """
        gemma_response = test_gemini_model.generate_content(prompt)

        # This robust regex finds the JSON block, even if it's wrapped in markdown or other text.
        match = re.search(r'\{.*\}', gemma_response.text, re.DOTALL)
        if not match:
            print(f"URL Scraping & AI Extraction Test: FAILED - Could not find a JSON object in the AI response.")
            print(f"Raw response from AI: {gemma_response.text[:500]}...")
            return False

        json_data = match.group(0)
        try:
            extracted_data = json.loads(json_data)
            assert isinstance(extracted_data, (dict, list)), "Expected dict or list output from AI"
            print("URL Scraping & AI Extraction Test: PASSED")
            return True
        except (json.JSONDecodeError, AssertionError) as e:
            print(f"URL Scraping & AI Extraction Test: FAILED - Data validation error: {e}")
            print(f"Attempted to parse: {json_data[:500]}...")
            return False

    except httpx.RequestError as e:
        print(f"URL Scraping & AI Extraction Test: FAILED - Network error scraping {TEST_SCRAPE_URL}: {e}")
        return False
    except Exception as e:
        print(f"URL Scraping & AI Extraction Test: FAILED - An unexpected error occurred: {e}")
        return False


def test_django_orm_crud_smoke():
    """
    Smoke test for Django ORM CRUD (Create, Read, Update, Delete) operations.
    """
    print("\n--- Running Django ORM CRUD Smoke Test ---")
    if not DJANGO_ORM_AVAILABLE:
        print("Skipping Django ORM test: Django environment not configured.")
        return False

    try:
        # Clean up any residual record from previous failed runs
        Event.objects.filter(url=ORM_TEST_EVENT_URL).delete()
        print(f"Cleaned up any existing record for URL: {ORM_TEST_EVENT_URL}")

        # 1. Create
        print("Attempting to CREATE a dummy event...")
        event_obj = Event.objects.create(
            event_id=ORM_TEST_EVENT_ID_VAL,
            event_name=ORM_TEST_EVENT_NAME_VAL,
            url=ORM_TEST_EVENT_URL,
            start_time=make_aware(datetime(2025, 7, 20, 10, 0, 0)),
            fee="Free Test"
        )
        assert Event.objects.filter(url=ORM_TEST_EVENT_URL).exists(), "Create failed"
        print(f"CREATE PASSED. Created event with ID: {event_obj.id}")

        # 2. Read
        print("Attempting to READ the dummy event...")
        retrieved_event = Event.objects.get(url=ORM_TEST_EVENT_URL)
        assert retrieved_event.event_name == ORM_TEST_EVENT_NAME_VAL, "Read failed"
        print(f"READ PASSED. Retrieved event name: {retrieved_event.event_name}")

        # 3. Update
        print("Attempting to UPDATE the dummy event...")
        retrieved_event.event_name = ORM_TEST_UPDATED_EVENT_NAME_VAL
        retrieved_event.save()
        updated_event = Event.objects.get(url=ORM_TEST_EVENT_URL)
        assert updated_event.event_name == ORM_TEST_UPDATED_EVENT_NAME_VAL, "Update failed"
        print(f"UPDATE PASSED. Updated event name: {updated_event.event_name}")

        # 4. Delete
        print("Attempting to DELETE the dummy event...")
        updated_event.delete()
        assert not Event.objects.filter(url=ORM_TEST_EVENT_URL).exists(), "Delete failed"
        print("DELETE PASSED. Event record successfully deleted.")

        print("Django ORM CRUD Smoke Test: PASSED")
        return True

    except Exception as e:
        print(f"Django ORM CRUD Smoke Test: FAILED - An error occurred: {e}")
        Event.objects.filter(url=ORM_TEST_EVENT_URL).delete()
        return False


if __name__ == "__main__":
    print("--- Starting Smoke Tests ---")

    # Run API-related tests with a delay between them to respect rate limits
    image_test_passed = test_image_event_extraction_smoke()

    print("\nWaiting for 10 seconds to avoid hitting API rate limits...")
    time.sleep(10)  # Add a delay before the next API call

    url_test_passed = test_url_scraping_and_ai_extraction_smoke()

    # Run Django ORM test
    orm_test_passed = test_django_orm_crud_smoke()

    print("\n--- Smoke Tests Summary ---")
    # Determine overall success, correctly handling the case where ORM is unavailable
    all_passed = image_test_passed and url_test_passed and (orm_test_passed or not DJANGO_ORM_AVAILABLE)

    if all_passed:
        print("All enabled smoke tests PASSED successfully!")
    else:
        print("Some smoke tests FAILED. Please check the output for details.")
