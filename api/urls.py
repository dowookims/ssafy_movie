from django.urls import path
from . import views

app_name = 'api'

urlpatterns = [
    path('movies/', views.MovieList.as_view()),
]
