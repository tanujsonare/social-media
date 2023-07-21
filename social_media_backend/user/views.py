from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from rest_framework.authtoken.models import Token

from .models import CustomUser


class RegisterUserView(APIView):
    def post(self, request, format=None):
        serializer = serializers.RegisterNewUserSerializer(data=request.data, context={'request': request})
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            response = {"user": serializer.data}
            return Response(response, status=status.HTTP_201_CREATED)
        except:
            return Response({"error_message": "Please Fill all fields properly!!!"}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = CustomUser.objects.get(username=username)
            if user:
                if user.is_superuser or user.password == password:
                    token, created = Token.objects.get_or_create(user=user)
                    response_data = {
                        'token': token.key,
                        'user_id': user.pk,
                        'username': user.username,
                        'profile_image':user.profile_image.url if user.profile_image else None
                    }

                    return Response(response_data, status=status.HTTP_200_OK)            
        except:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        

class GetUserProfile(APIView):
    def get(self, request, format=None):
        user_id = request.GET.get("user_id")
        requested_user_id = request.GET.get("requested_user_id")
        if not user_id:
            raise Exception({"user_id": "This field is required."})
        if not requested_user_id:
            raise Exception({"requested_user_id": "This field is required."})
        user = CustomUser.objects.get(id=user_id)
        if user:
            serializer = serializers.GetUserProfileSerializer(user, context={"requested_user_id": requested_user_id})
            response = {"user_profile": serializer.data}
            return Response(response, status.HTTP_200_OK)
        return Response(status.HTTP_400_BAD_REQUEST)


class SearchUser(APIView):
    def get(self, request, format=None):
        user_name = request.GET.get("user_name")
        requested_user_id = request.GET.get("requested_user_id")
        request_from_chat_search = request.GET.get("chat_search")
        request_from_chat = request.GET.get("chat")
        if not request_from_chat:
            if not user_name:
                raise Exception({"user_name": "This field is required."})
        if not requested_user_id:
            raise Exception({"requested_user_id": "This field is required."})
        user = None
        requested_user = CustomUser.objects.get(id=requested_user_id)
        if user_name:
            user = CustomUser.objects.filter(username__icontains = user_name)
        if request_from_chat_search:
            user = user.filter(following=requested_user, followers=requested_user)
        if request_from_chat:
            user = requested_user.followers.all()
        if user:
            serializer = serializers.GetUserProfileSerializer(user, context={"requested_user_id": requested_user_id}, many=True)
            response = {"user_profiles": serializer.data}
            return Response(response, status.HTTP_200_OK)
        return Response({"error_message": "User not found !!"}, status.HTTP_400_BAD_REQUEST)