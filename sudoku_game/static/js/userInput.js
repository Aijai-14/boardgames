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

// Optional: Deselect cell when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('focusable')) {
        if (document.activeElement.classList.contains('focusable')) {
            document.activeElement.blur(); // Remove focus from the currently focused cell
        }
    }
});

