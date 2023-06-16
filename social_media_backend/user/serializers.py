from rest_framework import serializers
from .models import CustomUser


class RegisterNewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            # "profile_image",
            "bio",
            "password"
        ]


class GetUserProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "bio",
            "followers_count"
        ]

    def get_followers_count(self, obj):
        followers_count = obj.followers.count()
        return followers_count if followers_count else 0