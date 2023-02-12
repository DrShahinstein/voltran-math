from .models import Result
from django.http import HttpResponse
from django.shortcuts import get_object_or_404


def create_result(request):
    name = request.GET.get("name")
    inputs = request.GET.get("inputs")
    outputs = request.GET.get("outputs")

    result = Result()
    result.inputs = ["inputs", inputs]
    result.outputs = ["outputs", outputs]
    result.name = name
    result.save()

    return HttpResponse("Success!")


def delete_result(request):
    result_name = request.GET.get("name")
    target_result = get_object_or_404(Result, name=result_name)
    target_result.delete()

    return HttpResponse("Deleted!")
