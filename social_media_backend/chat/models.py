from django.db import models

from user.models import CustomUser


class Message(models.Model):
    sender_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="message_send_by")
    receiver_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="message_received_to")
    content = models.TextField()
    media = models.FileField(upload_to="images/", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
