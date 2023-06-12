from django.urls import path
from . import views

urlpatterns = [
    path("api/get_tweet", views.GetTweet.as_view(), name="get_tweet"),
    path("api/add_tweet", views.AddTweet.as_view(), name="add_tweet"),
    path("api/add_like", views.AddLike.as_view(), name="add_like"),
    path("api/add_follower", views.AddFollowers.as_view(), name="add_follower"),
]