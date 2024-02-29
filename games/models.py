from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class SnakeModel(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    snake_score = models.IntegerField()
    snake_highscore = models.IntegerField()
    snake_totalscore= models.IntegerField()
