from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import get_user_model, update_session_auth_hash
from django.contrib.auth.forms import AuthenticationForm, UserChangeForm, PasswordChangeForm
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
# from django.contrib.auth.forms import UserCreationForm

# Create your views here.
def signup(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('movie:index')
    else:
        form = CustomUserCreationForm()
        return render(request, 'account/signup.html', {'form': form})


def login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect(request.GET.get('next') or 'movie:index')
    else:
        form = AuthenticationForm()
        return render(request, 'account/login.html', {'form': form})


def logout(request):
    auth_logout(request)
    return redirect("movie:index")


@login_required
def detail(request, username):
    person = get_object_or_404(get_user_model(), username=username)
    return render(request, 'account/detail.html', {'person': person})
