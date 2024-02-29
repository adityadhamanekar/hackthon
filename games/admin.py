from django.contrib import admin
from .models import SnakeModel

# Register your models here.
class SnakeAdminModel(admin.ModelAdmin):
    list_display = ['player', 'snake_score', 'snake_highscore', 'snake_totalscore']



admin.site.register(SnakeModel, SnakeAdminModel)