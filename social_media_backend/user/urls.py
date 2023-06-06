from django.urls import path

from . import views

urlpatterns = [
    path('api/register', views.RegisterUserView.as_view(), name="register_new_user"),
    path('api/login', views.UserLoginView.as_view(), name='user_login'),
]
