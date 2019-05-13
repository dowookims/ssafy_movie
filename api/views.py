from django.shortcuts import render, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .serializers import MovieSerializer
from movie.models import Movie
# Create your views here.


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class MovieList(generics.ListAPIView):
    serializer_class = MovieSerializer
    pagination_class = CustomPagination
    queryset = Movie.objects.all()
