function updateCheckSolutionButtonState() {
    const cells = document.querySelectorAll('.sudoku-board > .focusable');
    const allFilled = Array.from(cells).every(cell => cell.textContent.trim().length > 0);
    document.getElementById('checkSolutionBtn').disabled = !allFilled;
}

// Call this function whenever a cell's content changes
document.querySelectorAll('.sudoku-board > .focusable').forEach(cell => {
    cell.addEventListener('input', updateCheckSolutionButtonState);
    cell.addEventListener('blur', updateCheckSolutionButtonState); // In case of losing focus without input
});

// Initial check in case the page is reloaded with some values already filled
document.addEventListener('DOMContentLoaded', updateCheckSolutionButtonState);

document.addEventListener('DOMContentLoaded', function() {
    const solveButton = document.getElementById('solveBtn');
    if (solveButton) {
        solveButton.addEventListener('click', function() {
            animateSolution();
        });
    }
});

function animateSolution() {
    const solution = JSON.parse(document.getElementById("solveBtn").dataset.sol);
    console.log(solution);  

    const cells = document.querySelectorAll('.sudoku-board > .integer, .sudoku-board > .focusable');
    let delay = 0;
    const delayIncrement = 100; // milliseconds delay between each cell's animation
    let row = 0, col = 0;

    cells.forEach((cell, index) => {
        // Capture the current values of row and col in the scope of the timeout
        (function(currentRow, currentCol) {
            setTimeout(() => {
                 // Use the captured values
                if (cell.classList.contains('focusable')) { 
                    cell.textContent = solution[currentRow][currentCol];
                    cell.style.backgroundColor = 'lightgreen';
                    cell.style.color = 'blue';
                }    
            }, delay);
        })(row, col);

        delay += delayIncrement;
        col += 1;
        if (col == 9) {
            col = 0;
            row += 1;
        }
    });

    // change class of cells from focusable to integer
    cells.forEach(cell => {
        cell.classList.remove('focusable');
        cell.classList.add('integer');
    });
}
