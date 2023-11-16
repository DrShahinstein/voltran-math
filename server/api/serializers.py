from core.models import Data
from rest_framework import serializers
from core.models import Result


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ["data_type", "lighting_type", "field_type", "value"]


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ["title", "description"]
