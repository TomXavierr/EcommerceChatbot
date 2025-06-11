from django.urls import path
from .consumers import ChatConsumer


print("✅ chat.routing loaded")

websocket_urlpatterns = [
    path("ws/chat/", ChatConsumer.as_asgi()),
]