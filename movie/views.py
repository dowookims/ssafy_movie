from django.shortcuts import render
from . models import Movie
# Create your views here.
def index(request):
    movies = Movie.objects.all()[:10]
    return render(request, 'movie/index.html', {
        'movies': movies,
    })
