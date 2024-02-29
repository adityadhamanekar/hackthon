from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from games.models import SnakeModel, hangmamModel, typefastModel

# Create your views here.
@login_required

def dashboard(request):
    snakeData = SnakeModel.objects.filter(player=request.user.id).first()
    hangmanData = hangmamModel.objects.filter(player=request.user.id).first()
    typefastData = typefastModel.objects.filter(player=request.user.id).first()
    
    
    snakerecord = SnakeModel.objects.filter(player=request.user.id).order_by('-date')[:5]
    hangmanrecord = hangmamModel.objects.filter(player=request.user.id).order_by('-date')[:5]
    typefastrecord = typefastModel.objects.filter(player=request.user.id).order_by('-date')[:5]

    all_records = list(snakerecord) + list(hangmanrecord) + list(typefastrecord)
    
    
    all_records.sort(key=lambda x: x.date, reverse=True)

    recent_five_records = all_records[:5]

    content = {
        "snake": snakeData,
        'hangman':hangmanData,
        'typefast':typefastData,
        "recent_record": recent_five_records
    }

    return render(request, 'dashboard/dashboard.html', content)


def analytics(request):
    snakerecord = SnakeModel.objects.filter(player=request.user.id).order_by('-date')
    hangmanrecord = hangmamModel.objects.filter(player=request.user.id).order_by('-date')
    typefastrecord = typefastModel.objects.filter(player=request.user.id).order_by('-date')

    all_records = list(snakerecord) + list(hangmanrecord) + list(typefastrecord)
    
    
    all_records.sort(key=lambda x: x.date, reverse=True)
    return render(request, 'dashboard/analytics.html', {"records": all_records})

def charts(request):
    snake_records = SnakeModel.objects.filter(player=request.user.id).order_by('-date')

    # Extracting labels and data for the chart
    labels = [record.date.strftime("%Y-%m-%d %H:%M:%S") for record in snake_records]
    data = [record.score for record in snake_records]

    content = {
        "recent_record": snake_records,
        "labels": labels,
        "data": data
    }

    return render(request, 'dashboard/graphs.html', content)