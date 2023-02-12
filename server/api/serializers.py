from rest_framework import serializers
from core.models import Result


class ResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Result
        fields = ["name", "inputs", "outputs"]
