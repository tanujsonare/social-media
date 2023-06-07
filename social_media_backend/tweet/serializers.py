from rest_framework import serializers

from . import models


class GetTweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tweet
        fields = [
            "id",
            "user",
            "content",
            "created_at",
        ]