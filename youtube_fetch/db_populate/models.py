from django.db import models

# Create your models here.
class APIKeys(models.Model):
    api_keys = models.CharField(max_length=200)

class VideoData(models.Model):
    video_id = models.CharField(max_length=100)
    video_title = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(max_length=5000, null=True, blank=True)
    published_time = models.DateTimeField()
    thumbnails = models.JSONField()
    urls = models.URLField(max_length=200)
    channel_name = models.CharField(max_length=100, null=True, blank=True)
    channel_id = models.CharField(max_length=100)
    creation_date = models.DateTimeField(auto_created=True,  auto_now_add=True)

    class Meta:
        ordering = [
            '-published_time',
        ]
        indexes = [
            models.Index(fields=['published_time']),
        ]