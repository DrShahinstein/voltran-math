from django.db import models
from picklefield.fields import PickledObjectField


class Result(models.Model):
    name = models.CharField("Result Name", max_length=100)
    inputs = PickledObjectField()
    outputs = PickledObjectField()

    def __str__(self):
        return self.name
