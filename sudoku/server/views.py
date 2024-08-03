from django.shortcuts import render
from django.http import JsonResponse
from sudoku.src import boardGeneration
import json

# Create your views here.

def menu(request):
    return render(request, 'main_menu/menu.html')


def playSudoku(request):
    board, solution = boardGeneration.generate_sudoku_board()
    context = {
        'board': board,
        'solution': json.dumps(solution)
    }

    return render(request, 'sudoku_board/index.html', context)


def resetSudokuBoard(request):
    board, solution = boardGeneration.generate_sudoku_board()
    return JsonResponse({
        'board': board,
        'solution': solution
    })
