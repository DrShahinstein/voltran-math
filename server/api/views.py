import json
from django.views.decorators.csrf import csrf_exempt
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
@csrf_exempt
def create_result(request):
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format in the request"}, status=400)

    result_title = data.get("result_title", "no-title-entered")
    description = data.get("description", "no-description")
    adv_inputs = data.get("adv_inputs", [])
    adv_outputs = data.get("adv_outputs", [])
    std_inputs = data.get("std_inputs", [])
    std_outputs = data.get("std_outputs", [])

    new_result = Result.objects.create(title=result_title, description=description)

    def create_data_objects(data_list, data_type, lighting_type):
        for item in data_list:
            Data.objects.create(
                result=new_result,
                data_type=data_type,
                lighting_type=lighting_type,
                field_type=item["name"],
                value=item["value"],
            )

    create_data_objects(adv_inputs, "input", "advanced")
    create_data_objects(adv_outputs, "output", "advanced")

    create_data_objects(std_inputs, "input", "standard")
    create_data_objects(std_outputs, "output", "standard")

    response_data = {"message": "Data added successfully"}
    return JsonResponse(response_data)


class ResultDeleteView(generics.DestroyAPIView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

    def delete(self, request, *args, **kwargs):
        result_title = self.kwargs.get("result_title")
        result = self.queryset.filter(title=result_title).first()
        if result:
            result.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
