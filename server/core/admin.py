from django.contrib import admin
from .models import Result, Data


class DataInline(admin.TabularInline):
    model = Data


@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    inlines = [DataInline]
