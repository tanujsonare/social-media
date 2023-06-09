from rest_framework import serializers

from . import models
from user.models import CustomUser


class GetTweetSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = models.Tweet
        fields = [
            "id",
            "user",
            "content",
            "created_at",
            "likes",
            "is_liked",
        ]

    def get_is_liked(self, obj):
        user_id = self.context.get("user_id") if self.context else None
        if user_id:
            user = CustomUser.objects.get(id=user_id)
            is_liked = False
            if user:
                liked_tweet = models.Like.objects.filter(user=user, tweet=obj)
                if liked_tweet:
                    is_liked = True   
                    return is_liked
            return is_liked


class AddTweetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Tweet
        fields = [
            "user",
            "content",
        ]
