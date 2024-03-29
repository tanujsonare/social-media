from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from user.models import CustomUser
from .models import Message
from .serializers import GetMessagesSerializer, AddNewMessagesSerializer

     
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


class AddNewMessage(APIView):
    def post(self, request, format=None):
        serializer = AddNewMessagesSerializer(data=request.data, context = {"request": request})
        try:
            if serializer.is_valid():
                serializer.save()
                return Response({"message": serializer.data}, status=status.HTTP_201_CREATED)
        except:
            return Response({"error_message": "Please write some text to send message"})
        


# chat/views.py
from django.shortcuts import render


def index(request):
    return render(request, "chat/index.html")


def room(request, room_name):
    return render(request, "chat/room.html", {"room_name": room_name})