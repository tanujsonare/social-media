from django.contrib import admin

from .models import Message


@admin.register(Message)
class TweetAdmin(admin.ModelAdmin):
    list_display=[
        'sender_user',
        'receiver_user',
        'created_at',
    ]