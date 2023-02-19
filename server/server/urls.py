from django.contrib import admin
from django.urls import path
from api.views import ResultsAPIView, CreateResultAPIView, ResultDeleteView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/results/', ResultsAPIView.as_view(), name='get_result'),
    path('api/results/create/', CreateResultAPIView.as_view(), name='create_result'),
    path('api/results/<str:result_name>/',
         ResultDeleteView.as_view(), name='result_delete'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
