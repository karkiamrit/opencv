from django.urls import re_path 
from . import consumers
from signlanguage.consumers import SignLanguageConsumer

websocket_urlpatterns = [
    re_path(r'ws/detection/',  SignLanguageConsumer.as_asgi())
]