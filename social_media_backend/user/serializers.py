from rest_framework import serializers
from .models import CustomUser


class RegisterNewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "profile_image",
            "bio",
            "password"
        ]


class GetUserProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "bio",
            "profile_image",
            "followers_count",
            "is_following",
        ]

    def get_followers_count(self, obj):
        followers_count = obj.followers.count()
        return followers_count if followers_count else 0
    
    def get_is_following(self, obj):
        requested_user_id = self.context.get("requested_user_id") if self.context else None
        is_following = False
        if requested_user_id:
            user = CustomUser.objects.get(id=requested_user_id)
            if user:
                following_user = user.following.all()
                if following_user:
                    for f_user in following_user:
                        if obj == f_user:
                            is_following = True
                            return is_following
        return is_following