from rest_framework import generics, filters
from .models import VideoData
from .serializers import VideoDataSerializer
from rest_framework import filters


# Create your views here.
class VideoDataView(generics.ListAPIView):
    queryset = VideoData.objects.all()
    serializer_class = VideoDataSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["video_title", "description"]
