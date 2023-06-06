from django.contrib import admin

# Register your models here.

from . import models
# from django.contrib.auth import get_user_model

# User = get_user_model

@admin.register(models.CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display=[
        'id',
        'username',
        'email',
        'is_superuser',
        'is_staff',
        'is_active'
    ]