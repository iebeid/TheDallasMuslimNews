# backend/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, EventViewSet # Import both ViewSets

router = DefaultRouter()
router.register(r'items', ItemViewSet) # Registers the endpoint for Item model data at /api/items/
router.register(r'events', EventViewSet) # Registers the endpoint for Event model data at /api/events/

urlpatterns = [
    path('', include(router.urls)), # Includes all URLs generated by the router
]