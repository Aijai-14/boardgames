from django.shortcuts import render
from sudoku_game.src import boardGeneration
import json

# Create your views here.

def index(request):
    board, solution = boardGeneration.generate_sudoku_board()
    context = {
        'board': board,
        'solution': json.dumps(solution)
    }

    return render(request, 'sudoku_board/index.html', context)

