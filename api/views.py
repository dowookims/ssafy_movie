from django.shortcuts import render, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .serializers import MovieSerializer, CommentSerializer, CommentCreateSerializer, CreditSerializer
from movie.models import Movie, Comment, Credit
from django.contrib.auth import get_user_model

# Create your views here.


class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class MovieList(generics.ListAPIView):
    serializer_class = MovieSerializer
    pagination_class = CustomPagination
    queryset = Movie.objects.all()


# TODO: make Comment Update, Delete
@api_view(['GET', 'POST'])
def comment(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    if request.method == 'POST':
        serializer = CommentCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie_id=movie.id, user=request.user)
            return Response(serializer.data)
    else:
        movie = get_object_or_404(Movie, pk=movie_id)
        comments = Comment.objects.filter(movie_id=movie.id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def login(request):
    return Response({
        'is_authenticated': request.user.is_authenticated
    })


@api_view(['GET'])
def detail(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    credit = Credit.objects.filter(movie_id=movie.id)
    serializer = CreditSerializer(credit, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def like_movie(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    if request.user in movie.like_users.all():
        movie.like_users.remove(request.user)
        return Response({'msg': f"{movie.title}를 {request.user.username}님이 좋아하지 않습니다."})
    else:
        movie.like_users.add(request.user)
        return Response({
            'msg': f"{movie.title}를 {request.user.username}님이 좋아합니다"
        })
# TODO: make Score Create, Read, Update, Delete
# TODO: make Movie Like
