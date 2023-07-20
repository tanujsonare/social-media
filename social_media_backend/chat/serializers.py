from rest_framework import serializers
from .models import Message


class GetMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "id",
            "sender_user",
            "receiver_user",
            "content",
            "media",
            "is_seen",
            "created_at",
        ]
