function updateCheckSolutionButtonState() {
    const cells = document.querySelectorAll('.sudoku-board > .focusable');
    const allFilled = Array.from(cells).every(cell => cell.textContent.trim().length > 0);
    document.getElementById('checkSolutionBtn').disabled = !allFilled;
}


document.querySelectorAll('.sudoku-board > .focusable').forEach(cell => {
    cell.addEventListener('input', updateCheckSolutionButtonState);
    cell.addEventListener('blur', updateCheckSolutionButtonState); // In case of losing focus without input
});

// Initial check in case the page is reloaded with some values already filled
document.addEventListener('DOMContentLoaded', updateCheckSolutionButtonState);


function animateSolution() {
    const solveBtn = document.getElementById("solveBtn");
    const solution = JSON.parse(solveBtn.dataset.sol);
    const cells = document.querySelectorAll('.sudoku-board .focusable');
    let delay = 0;
    const delayIncrement = 100; // milliseconds delay between each cell's animation

    cells.forEach((cell) => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        setTimeout(() => {
            if (cell.classList.contains('focusable')) {
                cell.textContent = solution[row][col];
                cell.style.backgroundColor = 'lightgreen';
                cell.style.color = 'blue';
                cell.classList.remove('focusable');
                cell.classList.add('integer');
            }
        }, delay);

        delay += delayIncrement;
    });

    
    solveBtn.disabled = true;
}


document.addEventListener('DOMContentLoaded', function() {
    const solveButton = document.getElementById('solveBtn');
    if (solveButton) {
        solveButton.addEventListener('click', animateSolution);
    }
});


function showMessage(message, isSuccess) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.padding = '10px 20px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.color = 'white';
    messageDiv.style.backgroundColor = isSuccess ? 'green' : 'red';
    messageDiv.style.transition = 'opacity 0.5s';
    messageDiv.style.opacity = '0';

    document.body.appendChild(messageDiv);

    // Fade in
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 10);

    // Fade out and remove
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 2000);
}

function checkSolution() {
    const cells = document.querySelectorAll('.sudoku-board > div');
    const solveBtn = document.getElementById("solveBtn");
    const solution = JSON.parse(solveBtn.dataset.sol);
    console.log(solution);
    let isCorrect = true;

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const userValue = parseInt(cell.textContent) || 0;
        const correctValue = solution[row][col];

        if (userValue === correctValue) {
            cell.style.backgroundColor = 'lightgreen';
        } else {
            cell.style.backgroundColor = 'red';
            isCorrect = false;
        }
    });

    if (isCorrect) {
        showMessage('Congratulations! You solved the puzzle!', true);
    } else {
        showMessage('Sorry, the solution is incorrect. Please try again.', false);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const checkSolutionBtn = document.getElementById('checkSolutionBtn');
    if (checkSolutionBtn) {
        checkSolutionBtn.addEventListener('click', checkSolution);
    }

    const cells = document.querySelectorAll('.sudoku-board > div');
    cells.forEach(cell => {
        cell.addEventListener('input', resetCellStyles);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.getElementById('ResetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetBoard);
    }
});

function resetBoard() {
    fetch('/reset/')  
        .then(response => response.json())
        .then(data => {
            updateBoard(data.board);
            updateSolutionData(data.solution);
            resetCellStyles();
            enableSolveButton();
            disableCheckButton();
        })
        .catch(error => console.error('Error:', error));
}

function updateBoard(newBoard) {
    const cells = document.querySelectorAll('.sudoku-board > div');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = newBoard[row][col];
        
        cell.textContent = value !== 0 ? value : '';
        if (value !== 0) {
            cell.classList.remove('focusable');
            cell.classList.add('integer');
        } else {
            cell.classList.remove('integer');
            cell.classList.add('focusable');
            cell.tabIndex = 0;
        }
        
        
        cell.dataset.row = row;
        cell.dataset.col = col;
    });
}

function updateSolutionData(newSolution) {
    const solveBtn = document.getElementById("solveBtn");
    solveBtn.dataset.sol = JSON.stringify(newSolution);
}

function resetCellStyles() {
    const cells = document.querySelectorAll('.sudoku-board > div');
    cells.forEach(cell => {
        cell.style.color = 'black';  
        cell.style.fontWeight = 'normal';  
        cell.style.backgroundColor = '';  
        if (cell.classList.contains('focusable')) {
            cell.style.color = 'blue';
            cell.tabIndex = 0; 
        } 
    });
}

function enableSolveButton() {
    const solveBtn = document.getElementById("solveBtn");
    solveBtn.disabled = false;
}

function disableCheckButton() {
    const check = document.getElementById("checkSolutionBtn");
    check.disabled = true;
}

