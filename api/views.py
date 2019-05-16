from django.shortcuts import render, get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .serializers import MovieSerializer, CommentSerializer, CommentCreateSerializer, CreditSerializer, ScoreSerializer
from movie.models import Movie, Comment, Credit, Score
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
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


@api_view(['GET', 'POST'])
def like_movie(request, movie_id):
    print(request.user)
    if request.method=="POST":
        like=False
        print(request)
        movie = get_object_or_404(Movie, pk=movie_id)
        if request.user in movie.like_users.all():
            movie.like_users.remove(request.user)
        else:
            movie.like_users.add(request.user)
            like=True
        return Response({'msg': like})
    else:
        like =False
        movie = get_object_or_404(Movie, pk=movie_id)
        if request.user in movie.like_users.all():
            like =True
        else:
            like = False
        return Response({'msg': like})

# TODO: make Score Create, Read, Update, Delete
# TODO: make Movie Like

@api_view(['DELETE'])
def comment_delete(request, movie_id, comment_id):
    comment = get_object_or_404(Comment, pk=comment_id)
    comment.delete()
    data = True
    return Response({'data':data})
    

@api_view(['GET', 'POST'])
def score(request, movie_id):
    movie = get_object_or_404(Movie, pk=movie_id)
    if request.method == 'POST':
        serializer = ScoreSerializer(data=request.data)
        try:
            score = Score.objects.filter(movie_id=movie.id).filter(user=request.user)
            score.update(star=request.data['star'])
            return Response({
                'star': request.data['star']
            })
        except ObjectDoesNotExist:
            if serializer.is_valid(raise_exception=True):
                serializer.save(movie_id=movie.id, user=request.user)
                return Response(serializer.data)
    else:
        movie = get_object_or_404(Movie, pk=movie_id)
        # try:
        score, created = Score.objects.get_or_create(movie_id=movie.id, user=request.user)
        if created:
            score.star = 0
        serializer = ScoreSerializer(score)
        return Response(serializer.data)
        # except ObjectDoesNotExist:
        #     return Response({
        #         'star': 0
        #     })