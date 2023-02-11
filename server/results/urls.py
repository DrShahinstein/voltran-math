from django.urls import path
from . import views

app_name = 'results'

urlpatterns = [
    path('create/', views.create_result, name='create'),
    path('view/<int:result_id>/', views.view_result, name='view'),
]
