from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique = True)
    full_name = models.CharField(max_length = 100, blank=True)
    contact = models.CharField(max_length=15, blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']