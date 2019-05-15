from django.urls import path
from . import views


app_name = 'api'

urlpatterns = [
    path('movies/', views.MovieList.as_view()),
    # TODO: make Score API URL
    path('movies/<int:movie_id>/comments/', views.comment),
    path('account/login/', views.login),
]
