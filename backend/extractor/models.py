from django.db import models

class Event(models.Model):
    event_id = models.CharField(max_length=255, unique=False, null=True, blank=True)
    event_name = models.CharField(max_length=500)
    event_description = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=500, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    url = models.URLField(max_length=500, unique=True)
    start_time = models.DateTimeField(blank=True, null=True)
    end_time = models.DateTimeField(blank=True, null=True)
    fee = models.CharField(max_length=100, blank=True, null=True)
    flyer_image_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'scraped_events'

    def __str__(self):
        return self.event_name or f"Event from {self.url}"