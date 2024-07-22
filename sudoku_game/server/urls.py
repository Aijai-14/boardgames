from django.urls import path
from sudoku_game.server import views

urlpatterns = [
    path('', views.index, name='index'),
]
