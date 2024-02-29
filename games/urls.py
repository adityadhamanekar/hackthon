from django.urls import path
from . import views

urlpatterns = [
    path('hangman', views.hangman, name= 'hangman' ),
    path('snakegame', views.snakeGame, name= 'snakegame'),
    path('typefast', views.typefast, name= 'typefast'),
    path('timepass', views.timepass, name = 'timepass')
]
