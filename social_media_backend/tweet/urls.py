from django.urls import path
from . import views

urlpatterns = [
    path("api/get_tweet", views.GetTweet.as_view(), name="get_tweet"),
    path("api/add_tweet", views.AddTweet.as_view(), name="add_tweet"),
]