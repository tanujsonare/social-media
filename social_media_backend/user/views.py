from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterNewUserSerializers
from rest_framework.authtoken.models import Token

from .models import CustomUser


class RegisterUserView(APIView):
    def post(self, request, format=None):
        serializer = RegisterNewUserSerializers(data=request.data, context={'request': request})
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
                        'username': user.username
                    }

                    return Response(response_data, status=status.HTTP_200_OK)            
        except:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)