from celery import shared_task
from datetime import datetime, timedelta
import os
import django
import requests
import json
from django.core.exceptions import MultipleObjectsReturned
from .models import APIKeys, VideoData
from .serializers import VideoDataSerializer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "youtube_fetch.settings")
django.setup()


@shared_task
def populate_db():
    """
    Celery task to populate db every minute
    """
    api_key = APIKeys.objects.all()
    # Added three API keys whichever will work will store data other wise it will throw daily limit reached error
    for api in api_key:
        # date from when data to be fetched
        date_to_fetch_from = str(datetime.today().date() - timedelta(days=2))
        url = f"https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&publishedAfter={date_to_fetch_from}T16%3A23%3A36Z&q=cricket&key={api.api_keys}"

        response = requests.get(url)
        if response.status_code > 399:
            print("Api reached daily limit", response.status_code)
            continue
        print(response.status_code)
        json_data = json.loads(response.text)["items"]
        for data in json_data:
            data_to_insert = {
                "video_id": data.get("id")["videoId"],
                "video_title": data.get("snippet")["title"],
                "description": data.get("snippet")["description"],
                "published_time": data.get("snippet")["publishTime"],
                "thumbnails": data.get("snippet")["thumbnails"],
                "urls": f"""https://www.youtube.com/watch?v={data.get("id")["videoId"]}""",
                "channel_name": data.get("snippet")["channelTitle"],
                "channel_id": data.get("snippet")["channelId"],
            }

            try:
                vid_data = VideoData.objects.get(video_id=data.get("id")["videoId"])
                # print('Data already present')
            except MultipleObjectsReturned:
                pass
                # print('Data already present')
            except:
                serializer = VideoDataSerializer(data=data_to_insert)
                # Validate the data
                if serializer.is_valid():
                    # Save the validated data to the database
                    serializer.save(creation_date=datetime.now())
                else:
                    # Print validation errors if any
                    print(serializer.errors)
        break
