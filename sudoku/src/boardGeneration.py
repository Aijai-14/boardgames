import random


def generate_sudoku_board():
    # Initialize empty 9x9 board
    board = [[0]*9 for _ in range(9)]
    
    def is_valid(board, row, col, num):
        # Check row and column
        for x in range(9):
            if board[row][x] == num or board[x][col] == num:
                return False
        
        # Check 3x3 subgrid
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for r in range(start_row, start_row + 3):
            for c in range(start_col, start_col + 3):
                if board[r][c] == num:
                    return False
        
        return True
    
    def solve_sudoku(board):
        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    for num in random.sample(range(1, 10), 9):
                        if is_valid(board, i, j, num):
                            board[i][j] = num
                            if solve_sudoku(board):
                                return True
                            board[i][j] = 0
                    return False
        return True
    
    # Fill diagonal 3x3 subgrids
    for i in range(0, 9, 3):
        nums = random.sample(range(1, 10), 9)
        for r in range(3):
            for c in range(3):
                board[i+r][i+c] = nums[r*3 + c]
    
    # Solve the rest of the board
    solve_sudoku(board)
    
    # Store the solved board
    solved_board = [row[:] for row in board]
    
    # Remove numbers to create a puzzle
    cells_to_remove = random.randint(40, 55)  # Adjust range for desired difficulty
    while cells_to_remove > 0:
        row, col = random.randint(0, 8), random.randint(0, 8)
        if board[row][col] != 0:
            board[row][col] = 0
            cells_to_remove -= 1
    
    return board, solved_board
