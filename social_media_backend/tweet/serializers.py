from rest_framework import serializers

from . import models
from user.models import CustomUser


class GetTweetSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField(read_only=True)
    user_name= serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    user_profile_image = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = models.Tweet
        fields = [
            "id",
            "user",
            "content",
            "created_at",
            "likes",
            "image",
            "is_liked",
            "user_name",
            "is_following",
            "user_profile_image"
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
        
    def get_user_name(self, obj):
        user_name = obj.user.username
        return user_name if user_name else None
    
    def get_is_following(self, obj):
        user_id = self.context.get("user_id") if self.context else None
        is_following = False
        if user_id:
            user = CustomUser.objects.get(id=user_id)
            if user:
                following_user = user.following.all()
                if following_user:
                    for f_user in following_user:
                        if obj.user == f_user:
                            is_following = True
                            return is_following
        return is_following
    
    def get_user_profile_image(self, obj):
        if obj.user.profile_image:
            profile_image = obj.user.profile_image.url
            return profile_image if profile_image else None
        
    def get_likes(self, obj):
        liked_tweet = models.Like.objects.filter(tweet=obj)
        return liked_tweet.count() if liked_tweet else 0


class AddTweetSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Tweet
        fields = [
            "user",
            "content",
            "image",
        ]
