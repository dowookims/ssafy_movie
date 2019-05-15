from django.shortcuts import render, redirect, get_object_or_404
from .models import Movie, Comment
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . serializers import MovieSerializer
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
# Create your views here.
def index(request):
    return render(request, 'movie/index.html')


@api_view(['GET'])
def movies(request):
    movie_list = Movie.objects.all()[:10]
    serializer = MovieSerializer(movie_list, many=True)
    return Response(serializer.data)


@login_required
@require_http_methods(["POST"])
def comment_create(request, id):
    form = CommentForm(request.POST)
    if form.is_valid():
        comment = form.save(commit=False)
        post = Movie.objects.get(pk=id)
        comment.user = request.user
        comment.post = post
        comment.save()
    return redirect('posts:index')


@login_required
def comment_delete(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    if comment.user != request.user:
        return redirect('posts:index')
    comment.delete()
    return redirect('movie:index')
