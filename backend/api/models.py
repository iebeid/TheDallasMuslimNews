# backend/api/models.py
from django.db import models

class Item(models.Model): # Your existing Item model definition
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name