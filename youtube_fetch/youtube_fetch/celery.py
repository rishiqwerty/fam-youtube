import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "youtube_fetch.settings")
app = Celery("youtube_fetch")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks(
    ['db_populate.video_data_populate']
)

app.conf.beat_schedule = {
    "populate_db": {
        "task": "db_populate.video_data_populate.populate_db",
        "schedule": 60.0
    }
}