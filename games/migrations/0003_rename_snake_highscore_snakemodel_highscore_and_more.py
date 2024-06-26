# Generated by Django 4.1.4 on 2024-02-29 16:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("games", "0002_snakemodel_gamename"),
    ]

    operations = [
        migrations.RenameField(
            model_name="snakemodel",
            old_name="snake_highscore",
            new_name="highscore",
        ),
        migrations.RenameField(
            model_name="snakemodel",
            old_name="snake_score",
            new_name="score",
        ),
        migrations.RenameField(
            model_name="snakemodel",
            old_name="snake_totalscore",
            new_name="totalscore",
        ),
        migrations.AddField(
            model_name="snakemodel",
            name="date",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="typefastModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("gamename", models.CharField(default="type fast", max_length=15)),
                ("score", models.IntegerField()),
                ("highscore", models.IntegerField()),
                ("totalscore", models.IntegerField()),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "player",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="hangmamModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("gamename", models.CharField(default="hangman", max_length=15)),
                ("score", models.IntegerField()),
                ("highscore", models.IntegerField()),
                ("totalscore", models.IntegerField()),
                ("date", models.DateTimeField(auto_now_add=True)),
                (
                    "player",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
