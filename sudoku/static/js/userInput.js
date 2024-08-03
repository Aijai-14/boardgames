document.querySelectorAll('.sudoku-board > .focusable').forEach(cell => {
        cell.tabIndex = 0; // Make the cell focusable
        cell.addEventListener('click', () => {
            cell.focus(); // Focus the cell on click
        });
});

document.addEventListener('keydown', (e) => {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('focusable')) {
        if (e.key >= 1 && e.key <= 9) {
            focusedElement.textContent = e.key; // Set cell content to the pressed key
            focusedElement.style.color = 'blue'; // Reset cell color
        } 
        else if (e.key === 'Backspace' || e.key === 'Delete') {
            focusedElement.textContent = ""; 
        }
        e.preventDefault(); // Prevent default to avoid any unwanted behavior
    }
});

// Deselect cell when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('focusable')) {
        if (document.activeElement.classList.contains('focusable')) {
            document.activeElement.blur(); // Remove focus from the currently focused cell
        }
    }
});

document.addEventListener('keydown', (e) => {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('focusable')) {
        let row = parseInt(focusedElement.dataset.row);
        let col = parseInt(focusedElement.dataset.col);
        let direction;

        switch (e.key) {
            case 'ArrowUp':
                direction = {row: -1, col: 0};
                break;
            case 'ArrowDown':
                direction = {row: 1, col: 0};
                break;
            case 'ArrowLeft':
                direction = {row: 0, col: -1};
                break;
            case 'ArrowRight':
                direction = {row: 0, col: 1};
                break;
            default:
                return;
        }

        e.preventDefault(); // Prevent default scrolling behavior

        let newFocusedElement;
        do {
            row = (row + direction.row + 9) % 9;
            col = (col + direction.col + 9) % 9;
            newFocusedElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        } while (newFocusedElement && !newFocusedElement.classList.contains('focusable'));

        if (newFocusedElement) {
            newFocusedElement.focus();
        }
    }
});