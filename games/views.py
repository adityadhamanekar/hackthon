from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import SnakeModel, ShooterGameModel
from django.contrib import messages
import json


@login_required
def hangman(request):
    return render(request, 'games/hangman.html')

@csrf_exempt
@login_required
def snakeGame(request): 
    if request.method == 'POST':
        try:
            score = request.POST.get('score')
            player = request.user
            try:
                highscore = (int(SnakeModel.objects.filter(player=request.user).order_by('-date').last().highscore) or 0)
                if highscore < int(score):
                    highscore = int(score)
                totalscore =(int(SnakeModel.objects.filter(player=request.user).order_by('-date').last().totalscore) or 0)+ int(score)
            except:
                highscore = score
                totalscore = score
            
            snakedata = SnakeModel.objects.create(player=player, score=score, highscore=highscore, totalscore = totalscore)

            snakedata.save()
            
            return render(request, 'games/snake.html')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return render(request, 'games/snake.html')

@login_required
def typefast(request):
    return render(request, 'games/typing.html')

def timepass(request):
    return render(request, 'games/timepass.html')



@login_required
def shooterGame(request):
    if request.method == 'POST':
        try:
            score = request.POST.get('score')
            player = request.user
            try:
                highscore = (int(ShooterGameModel.objects.filter(player=request.user).order_by('-date').last().highscore) or 0)
                if highscore < int(score):
                    highscore = int(score)
                totalscore =(int(ShooterGameModel.objects.filter(player=request.user).order_by('-date').last().totalscore) or 0)+ int(score)
            except:
                highscore = score
                totalscore = score
            
            shooterdata = ShooterGameModel.objects.create(player=player, score=score, highscore=highscore, totalscore = totalscore)

            shooterdata.save()

            return render(request, 'games/shooter.html')
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return  render(request, 'games/shooter.html')