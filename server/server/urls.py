from django.contrib import admin
from django.urls import path
from api.views import ResultViewSet
from core.views import create_result, delete_result

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/results/', ResultViewSet.as_view({'get': 'list'})),
    path('create/', create_result),
    path('delete/', delete_result)
]
