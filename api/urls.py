from django.urls import path
from . import views


app_name = 'api'

urlpatterns = [
    path('movies/', views.MovieList.as_view()),
    # TODO: make Score API URL
    path('movies/<int:movie_id>/comments/', views.comment),
    path('account/login/', views.login),
    path('movies/<int:movie_id>/detail/', views.detail),
    path('movies/<int:movie_id>/like/', views.like_movie),
    path('movies/<int:movie_id>/comments/<int:comment_id>/delete/', views.comment_delete),
]
