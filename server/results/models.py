from django.db import models


class Result(models.Model):
    input_name = models.CharField(max_length=100)
    input_value = models.PositiveIntegerField()
    output_name = models.CharField(max_length=100)
    output_value = models.PositiveIntegerField()
