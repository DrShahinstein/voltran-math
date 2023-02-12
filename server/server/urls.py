from django.contrib import admin
from django.urls import path
from api.views import ResultsAPIView, CreateResultAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/results/', ResultsAPIView.as_view(), name='results'),
    path('api/results/create/', CreateResultAPIView.as_view(), name='create_result'),
]
