from rest_framework import serializers
from .models import CustomUser
from chat.models import Message


class RegisterNewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "username",
            "email",
            "profile_image",
            "bio",
            "password"
        ]


class GetUserProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    following_user = serializers.SerializerMethodField(read_only=True)
    followers_user = serializers.SerializerMethodField(read_only=True)
    
    # Fields related to chat functionality
    is_conversation = serializers.SerializerMethodField(read_only=True)
    last_message = serializers.SerializerMethodField(read_only=True)
    
    
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "bio",
            "profile_image",
            "followers_count",
            "is_following",
            "following_count",
            "following_user",
            "followers_user",
            "is_conversation",
            "last_message",
        ]

    def get_followers_count(self, obj):
        followers_count = obj.followers
        return followers_count.count() if followers_count else 0
    
    def get_following_count(self, obj):
        followers_count = obj.following
        return followers_count.count() if followers_count else 0
    
    def get_is_following(self, obj):
        requested_user_id = self.context.get("requested_user_id") if self.context else None
        is_following = False
        if requested_user_id:
            user = CustomUser.objects.get(id=requested_user_id)
            if user:
                following_user = user.following.all()
                if following_user:
                    for f_user in following_user:
                        if obj == f_user:
                            is_following = True
                            return is_following
        return is_following
    
    def get_following_user(self, obj):
        requested_user_id = self.context.get("requested_user_id") if self.context else None
        following_user = obj.following.all()
        following_list = []
        for user in following_user:
            following_user_dict = {}
            following_user_dict["id"] = user.id
            following_user_dict["username"] = user.username
            following_user_dict["profile_image"] = user.profile_image.url if user.profile_image else None
            try:
                following_user_dict["is_following"] = CustomUser.objects.filter(id=requested_user_id, following = user).exists()
            except:
                following_user_dict["is_following"] = False
            following_list.append(following_user_dict)
        return following_list if following_list else None
    
    def get_followers_user(self, obj):
        requested_user_id = self.context.get("requested_user_id") if self.context else None
        followers_user = obj.followers.all()
        followers_list = []
        for user in followers_user:
            followers_user_dict = {}
            followers_user_dict["id"] = user.id
            followers_user_dict["username"] = user.username
            followers_user_dict["profile_image"] = user.profile_image.url if user.profile_image else None
            try:
                followers_user_dict["is_following"] = CustomUser.objects.filter(id=requested_user_id, following = user).exists()
            except:
                followers_user_dict["is_following"] = False
            followers_list.append(followers_user_dict)
        return followers_list if followers_list else None
    
    def get_is_conversation(self, obj):
        requested_user_id = self.context.get("requested_user_id") if self.context else None
        try:
            requested_user = CustomUser.objects.get(id=requested_user_id)
            messages = Message.objects.filter(sender_user=obj, receiver_user=requested_user) | Message.objects.filter(sender_user=requested_user, receiver_user=obj)
            return messages.exists()
        except Exception as e:
            raise Exception("Error in user chat application")
        
    def get_last_message(self,obj):
        requested_user_id = self.context.get("requested_user_id") if self.context else None
        try:
            requested_user = CustomUser.objects.get(id=requested_user_id)
            messages = Message.objects.filter(sender_user=obj, receiver_user=requested_user) | Message.objects.filter(sender_user=requested_user, receiver_user=obj)
            return messages.last() if messages else None
        except Exception as e:
            raise Exception("Error in user chat application")
