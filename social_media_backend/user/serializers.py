from rest_framework import serializers
from .models import CustomUser


class RegisterNewUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            # "profile_image",
            "bio",
            "password"
        ]