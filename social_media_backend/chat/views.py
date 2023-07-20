from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from user.models import CustomUser
from .models import Message
from .serializers import GetMessagesSerializer

     
class GetMessages(APIView):
    def get(self, request, format=None):
        user_id = request.GET.get("user_id")
        requested_user_id = request.GET.get("requested_user_id")
        if not user_id:
            raise Exception({"user_id": "This field is required."})
        if not requested_user_id:
            raise Exception({"requested_user_id": "This field is required."})
        try:
            user = get_object_or_404(CustomUser, id=user_id)
            requested_user = get_object_or_404(CustomUser, id=requested_user_id)
            messages = Message.objects.filter(sender_user=user, receiver_user=requested_user) | Message.objects.filter(sender_user=requested_user, receiver_user=user)
            if messages:
                serializer = GetMessagesSerializer(messages.order_by("created_at"), many=True)
                return Response({"messages": serializer.data}, status.HTTP_200_OK)
        except:
            return Response({"error_message": "Message not found !!"}, status.HTTP_400_BAD_REQUEST)