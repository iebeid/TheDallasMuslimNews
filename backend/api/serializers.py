from rest_framework import serializers
from .models import Item # Your existing Item model
from extractor.models import Event # CORRECTED: Import directly from the app

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__' # Serializes all fields from the Item model

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        # Explicitly list the fields to be serialized from the Event model.
        # This ensures consistency and clarity for your API consumers.
        fields = [
            'event_id',
            'event_name',
            'event_description',
            'address',
            'phone',
            'url',
            'start_time',
            'end_time',
            'fee',
            'flyer_image_url',
            'created_at',
            'updated_at'
        ]
        # Alternatively, to include all fields automatically, you could use:
        # fields = '__all__'