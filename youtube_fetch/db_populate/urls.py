from django.urls import path
from .views import VideoDataView

urlpatterns = [
    path("video-data/", VideoDataView.as_view()),
]
