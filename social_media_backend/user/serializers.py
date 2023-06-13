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

    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "bio",
            "followers"
        ]