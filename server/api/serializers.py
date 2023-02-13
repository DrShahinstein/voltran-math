from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from core.models import Result, Input, Output


class InputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Input
        fields = ('name', 'value')


class OutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Output
        fields = ('name', 'value')


class ResultSerializer(serializers.ModelSerializer):
    inputs = InputSerializer(many=True)
    outputs = OutputSerializer(many=True)

    class Meta:
        model = Result
        fields = ('result_name', 'inputs', 'outputs')

    def create(self, validated_data):
        result_name = validated_data["result_name"]
        inputs = validated_data["inputs"]
        outputs = validated_data["outputs"]

        if Result.objects.filter(result_name=result_name).exists():
            raise ValidationError(
                f"Result with name {result_name} already exists.")

        result = Result(result_name=result_name)
        result.save()

        for input_data in inputs:
            input = Input.objects.create(**input_data)
            result.inputs.add(input)

        for output_data in outputs:
            output = Output.objects.create(**output_data)
            result.outputs.add(output)

        return result
