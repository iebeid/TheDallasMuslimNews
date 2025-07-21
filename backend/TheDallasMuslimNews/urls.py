"""
URL configuration for TheDallasMuslimNews project.
...
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    # REMOVE THIS LINE: 'information_extractor' is not a registered app.
    # The event data is served through the '/api/events/' endpoint now.
    # path('events/', include('information_extractor.urls'))
]