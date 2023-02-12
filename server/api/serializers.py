from rest_framework import serializers
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
    inputs = InputSerializer(many=True, read_only=True)
    outputs = OutputSerializer(many=True, read_only=True)

    class Meta:
        model = Result
        fields = ('result_name', 'inputs', 'outputs')
