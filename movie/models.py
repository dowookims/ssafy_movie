from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=100)
    image = models.CharField(max_length=300)
    pubDate = models.IntegerField()
    director = models.CharField(max_length=200)
    actor = models.CharField(max_length=200)
    userRating = models.FloatField()
    subtitle = models.CharField(max_length=200)
    link = models.CharField(max_length=300)
