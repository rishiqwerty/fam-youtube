from django.db import models

# Create your models here.
class APIKeys(models.Model):
    api_keys = models.CharField(max_length=200)