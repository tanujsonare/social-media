from django.urls import path
from . import views


urlpatterns = [
    path("api/get_messages", views.GetMessages.as_view() , name="get_messages"),
    path("api/add_new_message", views.AddNewMessage.as_view() , name="add_new_message"),
]