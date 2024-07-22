import random

# Function to generate a Sudoku board
def generate_sudoku_board():
    # Initialize empty 9x9 board
    board = [[0]*9 for _ in range(9)]
    # print(board)
    
    # Function to check if a number can be placed at board[row][col]
    def is_valid(board, row, col, num):
        # Check row
        if num in board[row]:
            return False
        
        # Check column
        for r in range(9):
            if board[r][col] == num:
                return False
        
        # Check 3x3 subgrid
        start_row, start_col = 3 * (row // 3), 3 * (col // 3)
        for r in range(start_row, start_row + 3):
            for c in range(start_col, start_col + 3):
                if board[r][c] == num:
                    return False
        
        return True
    
    # Function to solve Sudoku using backtracking
    def solve_sudoku(board):
        for i in range(9):
            for j in range(9):
                if board[i][j] == 0:
                    for num in range(1, 10):
                        if is_valid(board, i, j, num):
                            board[i][j] = num
                            if solve_sudoku(board):
                                return True
                            board[i][j] = 0
                    return False
        return True
    
    # Generate a random starting point
    starting_point = random.randint(20, 30)  # Adjust range as needed
    
    # Fill the board with a solution
    solve_sudoku(board)

    # store the solved board in a separate variable to be accessed in other files
    solved_board = [row[:] for row in board]
    
    # Remove numbers to create a puzzle
    cells_to_remove = 81 - starting_point
    while cells_to_remove > 0:
        row, col = random.randint(0, 8), random.randint(0, 8)
        if board[row][col] != 0:
            board[row][col] = 0
            cells_to_remove -= 1
    
    return board, solved_board
