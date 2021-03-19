from django import forms
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        # the last_name field is used to store user password in plain text
        fields = ('username', 'password', 'last_name')
