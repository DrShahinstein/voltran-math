from rest_framework import generics
from core.models import Result
from .serializers import ResultSerializer


class ResultsAPIView(generics.ListAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer


class CreateResultAPIView(generics.CreateAPIView):
    serializer_class = ResultSerializer
