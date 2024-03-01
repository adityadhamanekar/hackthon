from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.



class SnakeModel(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    gamename = models.CharField(default= 'snake game', max_length= 15)
    score = models.IntegerField()
    highscore = models.IntegerField()
    totalscore= models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)


class hangmamModel(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    gamename = models.CharField(default= 'hangman', max_length= 15)
    score = models.IntegerField()
    highscore = models.IntegerField()
    totalscore= models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)


class typefastModel(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    gamename = models.CharField(default= 'type fast', max_length= 15)
    score = models.IntegerField()
    highscore = models.IntegerField()
    totalscore= models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)



class ShooterGameModel(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    gamename = models.CharField(default= 'Astroid shooter', max_length= 15)
    score = models.IntegerField()
    highscore = models.IntegerField()
    totalscore= models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)



