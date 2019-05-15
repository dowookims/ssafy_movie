from django.contrib import admin
from .models import Movie, Genre, Comment
# Register your models here.
class MovieAdmin(admin.ModelAdmin):
    fields = ('title', 'genres')
admin.site.register(Movie)


class GenreAdmin(admin.ModelAdmin):
    fields = ('name')
admin.site.register(Genre)
admin.site.register(Comment)
