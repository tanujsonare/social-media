from django.contrib import admin
from . import models

@admin.register(models.Tweet)
class TweetAdmin(admin.ModelAdmin):
    list_display=[
        'user',
        'likes'
    ]

@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display=[
        'user',
        'tweet'
    ]