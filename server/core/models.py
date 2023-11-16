from django.db import models


class Data(models.Model):
    result = models.ForeignKey("core.Result", on_delete=models.CASCADE)

    # input or output?
    data_type = models.CharField(
        verbose_name="Data Type",
        choices=[
            ("input", "Input"),
            ("output", "Output"),
        ],
        max_length=20,
    )

    # advanced ligthing or standart lighting?
    lighting_type = models.CharField(
        verbose_name="Ligthing Type",
        max_length=200,
        choices=[
            ("advanced", "Advanced"),
            ("standard", "Standart"),
        ],
    )

    # What fields are held for those input and output objects?
    field_type = models.CharField(
        verbose_name="Field",
        max_length=200,
        choices=[
            # fields for inputs
            ("power", "Power (kWh)"),
            ("time", "Time (h/24)"),
            ("lamps", "Lamps (count)"),
            ("lamps_unit_price", "Unite Price (for lamps)"),
            # fields for outputs
            ("energy_consumed", "Consumed Energy"),
            ("cost", "Cost (₺)"),
        ],
    )

    # Numerous value of the regarding field
    value = models.DecimalField(
        max_digits=10,
        decimal_places=4,
        verbose_name="Value",
    )

    def serialize(self):
        return {
            "name": self.get_data_type_display(),
            "value": self.value,
        }


class Result(models.Model):
    title = models.CharField(
        verbose_name="Title",
        max_length=300,
    )

    description = models.TextField(
        verbose_name="Description", max_length=1000, blank=True, null=True
    )

    def get_all_data(self):
        return Data.objects.filter(result=self)

    def get_inputs(self):
        return Data.objects.filter(result=self, type="input")

    def get_outputs(self):
        return Data.objects.filter(result=self, type="output")

    @classmethod
    def serialize_collection(cls, objects):
        output = []

        for obj in objects:
            o2 = {}
            o2["result_title"] = obj.title
            o2["adv_inputs"] = [
                data.serialize()
                for data in Data.objects.filter(
                    result=obj, data_type="input", lighting_type="advanced"
                )
            ]
            o2["adv_outputs"] = [
                data.serialize()
                for data in Data.objects.filter(
                    result=obj, data_type="output", lighting_type="advanced"
                )
            ]
            o2["std_inputs"] = [
                data.serialize()
                for data in Data.objects.filter(
                    result=obj, data_type="input", lighting_type="standard"
                )
            ]
            o2["std_outputs"] = [
                data.serialize()
                for data in Data.objects.filter(
                    result=obj, data_type="output", lighting_type="standard"
                )
            ]

            output.append(o2)
        return output

    def __str__(self):
        return self.title
