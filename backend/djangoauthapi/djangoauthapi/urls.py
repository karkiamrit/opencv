from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from .asgi import application

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('account.urls')),
    path('api/sign/', include('signlanguage.urls')),
    # Add other URL patterns if needed
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
