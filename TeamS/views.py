from django.shortcuts import redirect, render
from django.urls import reverse
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from TeamS.forms import UserForm


def index(request):
    return render(request, 'home.html')


def register(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(request.POST)
        # user_pass_form = UserPassForm(request.POST)

        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()
            # user_pass = user_pass_form.save(commit=False)
            # user_pass.user = user
            # user_pass.save()
            registered = True
        else:
            print(user_form.errors)
    else:
        user_form = UserForm()
        # user_pass_form = UserPassForm()

    return render(request, 'register.html', context={'user_form': user_form, 'registered': registered})


def user_login(request):
    failed = False
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        # print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        # print(username)
        # print(password)
        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return redirect(reverse('index'))
            else:
                return HttpResponse("Your account is disabled")
        else:
            print("Invalid login")
            failed = True
            return render(request, 'login.html', context={'failed': failed})
    else:
        return render(request, 'login.html', context={'failed': failed})


@login_required
def user_logout(request):
    logout(request)
    return redirect(reverse('index'))