import json
from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from core.models import Data, Result
from .serializers import ResultSerializer


# GET
def render_results(request):
    results = Result.objects.all()
    serialized_results = Result.serialize_collection(results)
    return JsonResponse(serialized_results, safe=False)


# POST
def create_result(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format in the request"}, status=400)

    finally:
        result_title = data.get("result_title")
        adv_inputs   = data.get("adv_inputs")
        adv_outputs  = data.get("adv_outputs")
        std_inputs   = data.get("std_inputs")
        std_outputs  = data.get("std_outputs")

        new_result = Result(
            title=result_title,
            adv_inputs=adv_inputs,
            adv_outputs=adv_outputs,
            std_inputs=std_inputs,
            std_outputs=std_outputs,
        )

        new_result.save()

        response_data = {"message": "Data added successfully"}

        return JsonResponse(response_data)


class ResultDeleteView(generics.DestroyAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def delete(self, request, *args, **kwargs):
        result_title = self.kwargs.get("result_title")
        result = self.queryset.filter(result_title=result_title).first()
        if result:
            result.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
