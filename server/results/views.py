from django.shortcuts import render
from .models import Result


def create_result(request):
    if request.method == 'POST':
        input_name = request.POST['input_name']
        input_value = request.POST['input_value']
        output_name = request.POST['output_name']
        output_value = request.POST['output_value']
        Result.objects.create(input_name=input_name, input_value=input_value,
                              output_name=output_name, output_value=output_value)
        return render(request, 'create_result.html', {'message': 'Result created successfully!'})
    return render(request, 'create_result.html')


def view_result(request, result_id):
    result = Result.objects.get(id=result_id)
    return render(request, 'view_result.html', {'result': result})
