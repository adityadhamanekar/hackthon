from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name= 'home'),
    path('login/', views.handleLogin, name = 'login'),
    path('signup/', views.signup, name = 'signup'),
    path('logout/', views.handleLogout, name= 'logout'),
    path('quiz/',views.quiz, name = 'quiz'),
]
