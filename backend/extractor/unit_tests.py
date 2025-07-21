import os
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import base64
import httpx
import json
import re

# --- Configuration for Tests ---
# Ensure your GOOGLE_API_KEY is set in your environment variables.
# For example: export GOOGLE_API_KEY="YOUR_API_KEY"
GEMINI_MODEL_NAME = "gemini-1.5-pro"

# Initialize Gemma Model for tests
try:
    genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))
    if not os.environ.get('GOOGLE_API_KEY'):
        raise ValueError("GOOGLE_API_KEY environment variable not set. Cannot run Gemma tests.")
    test_gemini_model = genai.GenerativeModel(GEMINI_MODEL_NAME)
except Exception as e:
    print(f"Error initializing Gemma model for tests: {e}")
    test_gemini_model = None


def test_image_event_extraction_smoke():
    """
    Smoke test for extracting event information from an image using Gemma.
    This replicates the core logic from your original main.py.
    """
    print("\n--- Running Image Event Extraction Smoke Test ---")
    if not test_gemini_model:
        print("Skipping image test: Gemma model not initialized.")
        return False

    # Example image path used in your original main.py
    image_path = "https://epicmasjid.org/wp-content/uploads/2023/09/WhatsApp-Image-2025-03-25-at-8.26.55-PM.jpeg"
    prompt = "extract the event information from this image."

    try:
        image_response = httpx.get(image_path)
        image_response.raise_for_status()
        image_content = image_response.content
        base64_image = base64.b64encode(image_content).decode('utf-8')

        gemma_response = test_gemini_model.generate_content(
            [{'mime_type': 'image/jpeg', 'data': base64_image}, prompt]
        )
        extracted_text = gemma_response.text

        # Further process to get structured JSON as in your original main.py
        json_conversion_prompt = ["Convert the following information to structured information in JSON without any extra comments:", extracted_text]
        json_gemma_response = test_gemini_model.generate_content(json_conversion_prompt)

        json_text = json_gemma_response.text.replace("`", "").replace("json", "").strip()

        try:
            data = json.loads(json_text)
            print("Image Event Extraction Test: PASSED")
            print("Extracted Data (first few items):")
            for key, value in list(data.items())[:3]: # Print first 3 items
                print(f"  {key}: {value}")
            return True
        except json.JSONDecodeError as e:
            print(f"Image Event Extraction Test: FAILED - JSON decode error: {e}")
            print(f"Raw response attempting JSON parse: {json_text[:500]}...")
            return False

    except requests.exceptions.RequestException as e:
        print(f"Image Event Extraction Test: FAILED - Network error fetching image: {e}")
        return False
    except Exception as e:
        print(f"Image Event Extraction Test: FAILED - An unexpected error occurred: {e}")
        return False


def test_url_scraping_and_ai_extraction_smoke():
    """
    Smoke test for scraping a single URL and extracting event info via AI.
    This tests the core scraping and AI processing logic.
    """
    print("\n--- Running URL Scraping & AI Extraction Smoke Test ---")
    if not test_gemini_model:
        print("Skipping URL test: Gemma model not initialized.")
        return False

    # A sample URL to test the scraping and extraction
    test_url = "https://epicmasjid.org/category/upcoming-events/" # A page likely to have event info

    try:
        response = requests.get(test_url, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        web_page_content = soup.prettify()

        # Simplified prompt from scrape_events.py
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
            "event_name": "string",
            "event_description": "string",
            "address": "string",
            "start_time": "YYYY-MM-DD HH:MM:SS"
        }}
        """
        gemma_response = test_gemini_model.generate_content(prompt)

        json_match = re.search(r'```json\n(.*)\n```', gemma_response.text, re.DOTALL)
        if json_match:
            json_data = json_match.group(1).strip()
        else:
            json_data = gemma_response.text.strip()

        try:
            extracted_data = json.loads(json_data)
            # Basic assertions to check if data looks reasonable
            assert isinstance(extracted_data, dict) or isinstance(extracted_data, list), "Expected dict or list output from AI"
            if isinstance(extracted_data, list): # If AI returns a list of events
                assert len(extracted_data) > 0, "No events extracted from URL"
                # Check structure of first event if it's a list
                if extracted_data:
                    assert "event_name" in extracted_data[0] or "event_description" in extracted_data[0], "Expected event details in extracted data"
            else: # If AI returns a single event dict
                assert "event_name" in extracted_data or "event_description" in extracted_data, "Expected event details in extracted data"

            print("URL Scraping & AI Extraction Test: PASSED")
            print(f"Extracted JSON for {test_url}:")
            # Print a snippet of the extracted data for verification
            if isinstance(extracted_data, list) and extracted_data:
                print(json.dumps(extracted_data[0], indent=2))
            else:
                print(json.dumps(extracted_data, indent=2))
            return True

        except (json.JSONDecodeError, AssertionError) as e:
            print(f"URL Scraping & AI Extraction Test: FAILED - Data validation error: {e}")
            print(f"Raw response attempting JSON parse: {json_data[:500]}...")
            return False

    except requests.exceptions.RequestException as e:
        print(f"URL Scraping & AI Extraction Test: FAILED - Network error scraping {test_url}: {e}")
        return False
    except Exception as e:
        print(f"URL Scraping & AI Extraction Test: FAILED - An unexpected error occurred: {e}")
        return False

if __name__ == "__main__":
    print("--- Starting Smoke Tests ---")
    image_test_passed = test_image_event_extraction_smoke()
    url_test_passed = test_url_scraping_and_ai_extraction_smoke()

    print("\n--- Smoke Tests Summary ---")
    if image_test_passed and url_test_passed:
        print("All smoke tests PASSED successfully!")
    else:
        print("Some smoke tests FAILED. Please check the output for details.")