from django.urls import path
from . import views


app_name = 'api'

urlpatterns = [
    path('movies/', views.MovieList.as_view()),
    # TODO: make Comment & Score API URL
    # TODO: make Movie Recommend API URL
]
