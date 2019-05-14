# Generated by Django 2.2.1 on 2019-05-14 05:00

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0004_auto_20190514_0145'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movie',
            old_name='link',
            new_name='backdrop',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='actor',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='director',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='subtitle',
        ),
        migrations.AddField(
            model_name='movie',
            name='description',
            field=models.TextField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='movie',
            name='genres',
            field=models.ManyToManyField(related_name='movie_genres', to='movie.Genre'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.Movie'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='pubDate',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='score',
            name='movie',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.Movie'),
        ),
    ]
