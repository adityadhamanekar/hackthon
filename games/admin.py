from django.contrib import admin
from .models import SnakeModel , hangmamModel, typefastModel

# Register your models here.
class SnakeAdminModel(admin.ModelAdmin):
    list_display = ['player', 'score', 'highscore', 'totalscore','date', 'gamename']

class hangmanAdminModel(admin.ModelAdmin):
    list_display= ['player', 'score', 'highscore', 'totalscore','date', 'gamename']


class typefastAdminModel(admin.ModelAdmin):
    list_display= ['player', 'score', 'highscore', 'totalscore','date', 'gamename']



admin.site.register(SnakeModel, SnakeAdminModel)
admin.site.register(hangmamModel, hangmanAdminModel)
admin.site.register(typefastModel, typefastAdminModel)