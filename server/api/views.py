from rest_framework import viewsets
from core.models import Result
from .serializers import ResultSerializer


class ResultViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
