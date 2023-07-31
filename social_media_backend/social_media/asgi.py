"""
ASGI config for social_media project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

from chat.consumers import ChatRoomConsumer
from django.urls import path


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "social_media.settings")

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': AuthMiddlewareStack(
        URLRouter([
            path('ws/chat/', ChatRoomConsumer.as_asgi()),
            path('ws/chat/<str:room_name>', ChatRoomConsumer.as_asgi()),
        ])
    ),
})