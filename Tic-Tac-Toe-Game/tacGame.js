// script.js

const cells = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.game-board');
const resetButton = document.getElementById('reset-game');

let currentPlayer = 'X';

const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
];

function checkWin() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].textContent && 
            cells[a].textContent === cells[b].textContent && 
            cells[a].textContent === cells[c].textContent;
    });
}

function handleClick(event) {
    const cell = event.target;

    if (cell.textContent || checkWin()) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        setTimeout(() => alert(`Player ${currentPlayer} : Wins!`), 10);
    } else if ([...cells].every(cell => cell.textContent)) {
        setTimeout(() => alert("It's a Draw!"), 10);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
