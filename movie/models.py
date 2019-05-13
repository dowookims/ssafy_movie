from django.db import models
from django.conf import settings


class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value': self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)


class Movie(models.Model):
    title = models.CharField(max_length=100)
    image = models.CharField(max_length=300)
    pubDate = models.IntegerField()
    director = models.CharField(max_length=200)
    actor = models.CharField(max_length=200)
    userRating = models.FloatField()
    subtitle = models.CharField(max_length=200)
    link = models.CharField(max_length=300)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="like_movies", blank=True)


class Comment(models.Model):
    content = models.CharField(max_length=200)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Score(models.Model):
    star = IntegerRangeField(range(1, 10))
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
