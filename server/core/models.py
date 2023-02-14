from django.db import models


class Input(models.Model):
    name = models.CharField(max_length=100)
    value = models.TextField()


class Output(models.Model):
    name = models.CharField(max_length=100)
    value = models.TextField()


class Result(models.Model):
    result_name = models.CharField(max_length=100, default="RESULT_NAME", unique=True)
    inputs = models.ManyToManyField(Input)
    outputs = models.ManyToManyField(Output)
