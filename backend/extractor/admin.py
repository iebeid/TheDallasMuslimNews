from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('event_name', 'url', 'start_time', 'end_time', 'fee', 'updated_at')
    search_fields = ('event_name', 'event_description', 'address')
    list_filter = ('start_time', 'end_time')
    # Add more customizations for the admin interface as needed