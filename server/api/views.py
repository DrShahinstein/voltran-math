from rest_framework import generics, status
from rest_framework.response import Response
from core.models import Result
from .serializers import ResultSerializer


class ResultsAPIView(generics.ListAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer


class CreateResultAPIView(generics.CreateAPIView):
    serializer_class = ResultSerializer


class ResultDeleteView(generics.DestroyAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def delete(self, request, *args, **kwargs):
        result_name = self.kwargs.get('result_name')
        result = self.queryset.filter(result_name=result_name).first()
        if result:
            result.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
