from django.contrib import admin
from django.urls import path
from api.views import render_results, create_result, ResultDeleteView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/results/", render_results, name="GET results"),
    path("api/results/create/", create_result, name="POST results"),
    path(
        "api/results/delete/<str:result_title>/",
        ResultDeleteView.as_view(),
        name="DELETE results",
    ),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
