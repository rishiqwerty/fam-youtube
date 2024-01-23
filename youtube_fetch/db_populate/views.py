from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from .models import VideoData
from .serializers import VideoDataSerializer


# Create your views here.
class VideoDataView(generics.ListAPIView):
    queryset = VideoData.objects.all()
    serializer_class = VideoDataSerializer
