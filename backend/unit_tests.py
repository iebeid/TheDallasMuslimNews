import os
import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import base64
import httpx
import json
import re
from datetime import datetime

# --- Configuration for All Tests ---
# IMPORTANT: For Django ORM tests to run correctly, this script MUST be
# executed from your Django project's base directory (where manage.py is).
#
# GOOGLE_API_KEY: It is HIGHLY recommended to set this as an environment variable.
# For example: export GOOGLE_API_KEY="YOUR_ACTUAL_API_KEY" (Linux/macOS)
# or set GOOGLE_API_KEY="YOUR_ACTUAL_API_KEY" (Windows Cmd)
# If you must hardcode for quick testing (NOT recommended for production):
os.environ['GOOGLE_API_KEY'] = 'AIzaSyD2IcGPlMBUDE2QqHhmqZceWDoWrvAgetc'
GEMINI_MODEL_NAME = "gemini-1.5-pro"

# --- Image Event Extraction Test Configuration ---
TEST_IMAGE_URL = "https://epicmasjid.org/wp-content/uploads/2023/09/WhatsApp-Image-2025-03-25-at-8.26.55-PM.jpeg"
IMAGE_EXTRACTION_PROMPT = "extract the event information from this image."

# --- URL Scraping & AI Extraction Test Configuration ---
TEST_SCRAPE_URL = "https://www.irvingmasjid.org/"
# Define expected JSON keys for URL scraping AI prompt response (a subset for smoke test)
URL_EXTRACTION_JSON_FORMAT = """
{{
    "event_name": "string",
    "event_description": "string",
    "address": "string",
    "start_time": "YYYY-MM-DD HH:MM:SS"
}}
"""

# --- Django ORM CRUD Test Configuration ---
ORM_TEST_EVENT_URL = "http://test.com/dummy-event-crud-unique/" # Must be unique for each test run
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
    """
    print("\n--- Running Image Event Extraction Smoke Test ---")
    if not test_gemini_model:
        print("Skipping image test: Gemma model not initialized.")
        return False

    try:
        image_response = httpx.get(TEST_IMAGE_URL)
        image_response.raise_for_status()
        image_content = image_response.content
        base64_image = base64.b64encode(image_content).decode('utf-8')

        gemma_response = test_gemini_model.generate_content(
            [{'mime_type': 'image/jpeg', 'data': base64_image}, IMAGE_EXTRACTION_PROMPT]
        )
        extracted_text = gemma_response.text

        json_conversion_prompt = ["Convert the following information to structured information in JSON without any extra comments:", extracted_text]
        json_gemma_response = test_gemini_model.generate_content(json_conversion_prompt)

        json_text = json_gemma_response.text.replace("`", "").replace("json", "").strip()

        try:
            data = json.loads(json_text)
            print("Image Event Extraction Test: PASSED")
            print("Extracted Data (first few items):")
            for key, value in list(data.items())[:3]:
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
    """
    print("\n--- Running URL Scraping & AI Extraction Smoke Test ---")
    if not test_gemini_model:
        print("Skipping URL test: Gemma model not initialized.")
        return False

    try:
        response = requests.get(TEST_SCRAPE_URL, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        web_page_content = soup.prettify()

        prompt = f"""
        Extract the following event information from the provided HTML content.
        Provide the output as a JSON object with the following keys.
        If a field is not found, use null.

        HTML Content:
        ```html
        {web_page_content}
        ```

        JSON Output Format:
        {URL_EXTRACTION_JSON_FORMAT}
        """
        gemma_response = test_gemini_model.generate_content(prompt)

        json_match = re.search(r'```json\n(.*)\n```', gemma_response.text, re.DOTALL)
        if json_match:
            json_data = json_match.group(1).strip()
        else:
            json_data = gemma_response.text.strip()

        try:
            extracted_data = json.loads(json_data)
            assert isinstance(extracted_data, dict) or isinstance(extracted_data, list), "Expected dict or list output from AI"
            if isinstance(extracted_data, list):
                assert len(extracted_data) > 0, "No events extracted from URL"
                if extracted_data:
                    assert "event_name" in extracted_data[0] or "event_description" in extracted_data[0], "Expected event details in extracted data"
            else:
                assert "event_name" in extracted_data or "event_description" in extracted_data, "Expected event details in extracted data"

            print("URL Scraping & AI Extraction Test: PASSED")
            print(f"Extracted JSON for {TEST_SCRAPE_URL}:")
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
        print(f"URL Scraping & AI Extraction Test: FAILED - Network error scraping {TEST_SCRAPE_URL}: {e}")
        return False
    except Exception as e:
        print(f"URL Scraping & AI Extraction Test: FAILED - An unexpected error occurred: {e}")
        return False


def test_django_orm_crud_smoke():
    """
    Smoke test for Django ORM CRUD (Create, Read, Update, Delete) operations on the Event model.
    NOTE: This test requires Django's environment to be set up correctly.
    It should be run from the Django project's base directory (where manage.py is located).
    """
    print("\n--- Running Django ORM CRUD Smoke Test ---")
    if not DJANGO_ORM_AVAILABLE:
        print("Skipping Django ORM test: Django environment not configured.")
        return False

    try:
        # Clean up any residual record from previous failed runs to ensure test isolation
        Event.objects.filter(url=ORM_TEST_EVENT_URL).delete()
        print(f"Cleaned up any existing record for URL: {ORM_TEST_EVENT_URL}")

        # 1. Create (Insert)
        print("Attempting to CREATE a dummy event...")
        event_obj = Event.objects.create(
            event_id=ORM_TEST_EVENT_ID_VAL,
            event_name=ORM_TEST_EVENT_NAME_VAL,
            url=ORM_TEST_EVENT_URL,
            start_time=make_aware(datetime(2025, 7, 20, 10, 0, 0)), # <-- MODIFY THIS LINE
            end_time=make_aware(datetime(2025, 7, 20, 12, 0, 0)),   # <-- MODIFY THIS LINE
            fee="Free Test"
        )
        assert Event.objects.filter(url=ORM_TEST_EVENT_URL).exists(), "Create failed: Event record not found."
        print(f"CREATE PASSED. Created event with ID: {event_obj.id}")

        # 2. Read
        print("Attempting to READ the dummy event...")
        retrieved_event = Event.objects.get(url=ORM_TEST_EVENT_URL)
        assert retrieved_event.event_name == ORM_TEST_EVENT_NAME_VAL, "Read failed: Event name mismatch."
        print(f"READ PASSED. Retrieved event name: {retrieved_event.event_name}")

        # 3. Update
        print("Attempting to UPDATE the dummy event...")
        retrieved_event.event_name = ORM_TEST_UPDATED_EVENT_NAME_VAL
        retrieved_event.save()
        updated_event = Event.objects.get(url=ORM_TEST_EVENT_URL)
        assert updated_event.event_name == ORM_TEST_UPDATED_EVENT_NAME_VAL, "Update failed: Event name not updated."
        print(f"UPDATE PASSED. Updated event name: {updated_event.event_name}")

        # 4. Delete
        print("Attempting to DELETE the dummy event...")
        updated_event.delete()
        assert not Event.objects.filter(url=ORM_TEST_EVENT_URL).exists(), "Delete failed: Event record still found."
        print("DELETE PASSED. Event record successfully deleted.")

        print("Django ORM CRUD Smoke Test: PASSED")
        return True

    except Exception as e:
        print(f"Django ORM CRUD Smoke Test: FAILED - An error occurred: {e}")
        # Attempt to clean up even if test fails
        try:
            Event.objects.filter(url=ORM_TEST_EVENT_URL).delete()
            print("Cleaned up dummy record after failure.")
        except Exception as cleanup_e:
            print(f"Warning: Failed to clean up after ORM test failure: {cleanup_e}")
        return False

if __name__ == "__main__":
    print("--- Starting Smoke Tests ---")

    # Run API-related tests
    image_test_passed = test_image_event_extraction_smoke()
    url_test_passed = test_url_scraping_and_ai_extraction_smoke()

    # Run Django ORM test (only if Django environment could be set up)
    orm_test_passed = False
    if DJANGO_ORM_AVAILABLE:
        orm_test_passed = test_django_orm_crud_smoke()
    else:
        print("\nSkipping Django ORM CRUD Test due to environment setup issues.")


    print("\n--- Smoke Tests Summary ---")
    all_passed = image_test_passed and url_test_passed and (orm_test_passed if DJANGO_ORM_AVAILABLE else True)

    if all_passed:
        print("All enabled smoke tests PASSED successfully!")
    else:
        print("Some smoke tests FAILED. Please check the output for details.")