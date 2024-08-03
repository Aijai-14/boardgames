from django.urls import path
from sudoku.server import views

urlpatterns = [
    path('', views.menu, name='menu'),
    path('sudoku/', views.playSudoku, name='playSudoku'),
    path('reset/', views.resetSudokuBoard, name='resetSudokuBoard'),
]
