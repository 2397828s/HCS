from django.db import models
from django.contrib.auth.models import User

# class UserPass(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     passtext = models.CharField(max_length=256)
#
#     def __str__(self):
#         return self.user.username, passtext
