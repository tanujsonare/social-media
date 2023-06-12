from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin    
)
from .manager import CustomUserManager
# from django.contrib.auth import get_user_model


# UserModel = get_user_model()

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=200, unique=True)
    email = models.EmailField(unique=True)
    profile_image = models.FileField(upload_to='images', null=True, blank=True)
    bio = models.CharField(max_length=500, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True)
    followers = models.ManyToManyField('self', related_name='following', symmetrical=False, blank=True)

    USERNAME_FIELD = "username"
    objects = CustomUserManager()

    def __str__(self):
        return self.username
    
    class Meta:
        ordering = ("created_at",)