from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.
from . import serializers
from . import models
from user.models import CustomUser


class GetTweet(APIView):
    def get(self, request, format=None):
        user_id = request.GET.get("user_id")
        tweet_id = request.GET.get("tweet_id")
        if not user_id:
            raise Exception({"user_id": "This field is required."})
        if tweet_id:
            try:
                queryset = get_object_or_404(models.Tweet, id=tweet_id)
                serializer = serializers.GetTweetSerializer(queryset, context = {"user_id": user_id})
                response = {"tweet": serializer.data}
                return Response(response, status.HTTP_200_OK)
            except:
                return Response(status.HTTP_400_BAD_REQUEST)
        if not tweet_id:
            queryset = models.Tweet.objects.all()
            if queryset:
                serializer = serializers.GetTweetSerializer(queryset, many=True, context = {"user_id": user_id})
                response = {"tweets": serializer.data}
                return Response(response, status.HTTP_200_OK)
            return Response(status.HTTP_400_BAD_REQUEST)
    

class AddTweet(APIView):
    def post(self, request, format=None):
        serializer = serializers.AddTweetSerializer(data=request.data, context={"request":request})
        try:
            if serializer.is_valid():
                serializer.save()
                response = {"tweet": serializer.data}
                return Response(response, status=status.HTTP_201_CREATED)
        except:
            return Response({"error_message": "Please Fill all fields properly!!!"}, status=status.HTTP_400_BAD_REQUEST)
        

class AddLike(APIView):
    def get(self, request, format=None):
        tweet_id = request.GET.get("tweet_id")
        user_id = request.GET.get("user_id")
        if not tweet_id:
            raise Exception({"tweet_id": "This field is required."})
        if not user_id:
            raise Exception({"user_id": "This field is required."})
        user = CustomUser.objects.get(id=user_id)
        tweet = models.Tweet.objects.get(id=tweet_id)
        if tweet and user:
            like, created = models.Like.objects.get_or_create(user=user, tweet=tweet)
            if created:
                return Response({"message":"Tweet liked successfully!!!"})
        return Response({"error_message": "Tweet not found !!!!"}, status=status.HTTP_400_BAD_REQUEST)


class AddFollowers(APIView):
    def get(self, request, format=None):
        requested_user_id = request.GET.get("requested_user_id")
        follow_user_id = request.GET.get("follow_user_id")
        if not requested_user_id:
            raise Exception({"requested_user_id": "This field is required."})
        if not follow_user_id:
            raise Exception({"follow_user_id": "This field is required."})
        requested_user = CustomUser.objects.get(id=requested_user_id)
        follow_user = CustomUser.objects.get(id=follow_user_id)
        if requested_user and follow_user:
            follow_user.followers.add(requested_user)
            return Response({"message":f"Now Your following {follow_user.username} !!!"})
        else:
            return Response({"error_message": "User not found !!!!"}, status=status.HTTP_400_BAD_REQUEST)
        

class RemoveLike(APIView):
    def get(self, request, format=None):
        requested_user_id = request.GET.get("requested_user_id")
        tweet_id = request.GET.get("tweet_id")
        if not requested_user_id:
            raise Exception({"requested_user_id": "This field is required."})
        if not tweet_id:
            raise Exception({"tweet_id": "This field is required."})
        try:
            liked_tweet = liked_tweet = get_object_or_404(models.Like, tweet__id=tweet_id, user__id=requested_user_id)
            liked_tweet.delete()
            return Response({"message": "Like removed !!"}, status=status.HTTP_200_OK)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)


class DeleteTweet(APIView):
    def delete(self, request, format=None):
        user_id = request.data.get("user_id")
        tweet_id = request.data.get("tweet_id")
        if not user_id:
            raise Exception({"user_id": "This field is required."})
        if not tweet_id:
            raise Exception({"tweet_id": "This field is required."})
        try:
            tweet = get_object_or_404(models.Tweet, id=tweet_id, user__id=user_id)
            tweet.delete()
            return Response({"message": "Tweet deleted !!"}, status=status.HTTP_200_OK)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)


class UnFollowUsers(APIView):
    def get(self, request, format=None):
        requested_user_id = request.GET.get("requested_user_id")
        unfollow_user_id = request.GET.get("unfollow_user_id")
        if not requested_user_id:
            raise Exception({"requested_user_id": "This field is required."})
        if not unfollow_user_id:
            raise Exception({"unfollow_user_id": "This field is required."})
        requested_user = CustomUser.objects.get(id=requested_user_id)
        unfollow_user = CustomUser.objects.get(id=unfollow_user_id)
        if requested_user and unfollow_user:
            requested_user.following.remove(unfollow_user)
            return Response({"message":f" You unfollowed {unfollow_user.username} !!!"})
        else:
            return Response({"error_message": "User not found !!!!"}, status=status.HTTP_400_BAD_REQUEST)