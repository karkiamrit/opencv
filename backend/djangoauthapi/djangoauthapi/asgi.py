# import os
# from django.core.asgi import get_asgi_application
# from django.urls import path
# from channels.routing import ProtocolTypeRouter, URLRouter
# from signlanguage.consumers import SignLanguageConsumer

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoauthapi.settings')

# application = ProtocolTypeRouter(
#    {
#        'websocket': URLRouter([
           
#            path('api/sign/detection/', SignLanguageConsumer.as_asgi()),
#        ]),
#    }
# )

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from signlanguage.routing import websocket_urlpatterns


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoauthapi.settings')
application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": URLRouter(websocket_urlpatterns),
    }
)