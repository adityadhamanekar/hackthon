from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from .models import SnakeModel
import json

# Create your views here.
@login_required
def hangman(request):
    return render(request, 'games/hangman.html')

@csrf_exempt
@login_required
def snakeGame(request): 
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            score = data.get('score')
            highscore = data.get('highscore')
            player = request.user.username
            
            # Assuming SnakeModel has constraints or defaults for other fields such as snake_totalscore
            snakedata = SnakeModel.objects.create(player=player, snake_score=score, snake_highscore=highscore, snake_totalscore=100)
            snakedata.save()

            return JsonResponse({'message': 'Score saved successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
        

    return render(request, 'games/snake.html')

@login_required
def typefast(request):
    return render(request, 'games/typing.html')

def timepass(request):
    return render(request, 'games/timepass.html')