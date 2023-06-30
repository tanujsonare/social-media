from django.urls import path

from . import views

urlpatterns = [
    path('api/register', views.RegisterUserView.as_view(), name="register_new_user"),
    path('api/login', views.UserLoginView.as_view(), name='user_login'),
    path('api/get_user_profile', views.GetUserProfile.as_view(), name='get_user_profile'),
    path('api/search_user', views.SearchUser.as_view(), name='search_user'),
]
