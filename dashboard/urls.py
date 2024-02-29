from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard, name = 'dashboard'),
    path('analytics',views.analytics, name= 'analytics' ),
    path('charts', views.charts, name ='charts'),
]
