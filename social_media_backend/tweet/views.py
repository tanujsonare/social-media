from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
from . import serializers
from . import models
from user.models import CustomUser


class GetTweet(APIView):
    def get(self, request, format=None):
        user_id = request.GET.get("user_id")
        if not user_id:
            raise Exception({"user_id": "This field is required."})
        user = CustomUser.objects.get(id=user_id)
        if user:
            queryset = models.Tweet.objects.filter(user=user)
            serializer = serializers.GetTweetSerializer(queryset, many=True)
            response = {"tweets": serializer.data}
            return Response(response, status.HTTP_200_OK)
        return Response(response, status.HTTP_400_BAD_REQUEST)
    

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
    def post(self, request, format=None):
        tweet_id = request.POST.get("tweet_id")
        if not tweet_id:
            raise Exception({"tweet_id": "This field is required."})
        tweet = models.Tweet.objects.get(id=tweet_id)
        if tweet:
            like, created = models.Like.objects.get_or_create(user=request.user, tweet=tweet)
            if created:
                tweet.add_like()
                return Response({"message":"Tweet liked successfully!!!"})
        return Response({"error_message": "Tweet not found !!!!"}, status=status.HTTP_400_BAD_REQUEST)
        
