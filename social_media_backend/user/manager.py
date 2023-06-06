from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):

    def normalize_email(email):
        """
        Normalize the email address by lowercasing the domain part of it.
        """
        email = email or ""
        try:
            email_name, domain_part = email.strip().rsplit("@", 1)
        except ValueError:
            pass
        else:
            email = email_name + "@" + domain_part.lower()
        return email
    
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError(_("Users must have an user name"))
        if extra_fields.get('email') is not None:  
            extra_fields["email"] = self.normalize_email(extra_fields['email'])
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        # if extra_fields.get("is_staff") is not True:
        #     raise ValueError(_("User manager must have is_staff=True"))
        # if extra_fields.get("is_superuser") is not True:
        #     raise ValueError(_("User manager must have is_superuser=True"))
        # if extra_fields.get("is_active") is not True:
        #     raise ValueError(_("User manager must have is_active=True"))

        user = self.create_user(username=username, password=password, **extra_fields)
        return user