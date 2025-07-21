from rest_framework import viewsets
from .models import Item # Your existing model
from .serializers import ItemSerializer, EventSerializer # Import new EventSerializer
from extractor.models import Event # CORRECTED: Import directly from the app

class ItemViewSet(viewsets.ReadOnlyModelViewSet): # Your existing viewset
    """
    This viewset automatically provides `list` and `retrieve` actions for Items.
    """
    queryset = Item.objects.all() # Preserving your core query
    serializer_class = ItemSerializer

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset provides `list` and `retrieve` actions for Events.
    """
    queryset = Event.objects.all().order_by('-start_time') # Order by latest events
    serializer_class = EventSerializer