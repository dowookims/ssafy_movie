from django.shortcuts import render
from .models import Movie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . serializers import MovieSerializer

# Create your views here.
def index(request):
    return render(request, 'movie/index.html')

@api_view(['GET'])
def movies(request):
    movie_list = Movie.objects.all()[:10]
    serializer = MovieSerializer(movie_list, many=True)
    return Response(serializer.data)
