from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('equipment.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static


def home(request):
    return HttpResponse(
        "<h1>Chemical Visualizer Backend is Running</h1>"
        "<p>Use <code>/api/</code> for API access.</p>"
    )


urlpatterns = [
    path('', home),  # 👈 ROOT URL FIX
    path('admin/', admin.site.urls),
    path('api/', include('equipment.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
