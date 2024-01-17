const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let won = false;
    winConditions.forEach(condition => {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            won = true;
        }
    });

    return won;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(winner) {
    gameActive = false;
    document.getElementById('game').classList.add('hidden');
    const resultScreen = document.getElementById('result');
    const winnerText = document.getElementById('winner');
    winnerText.textContent = winner ? `${winner} Wins!` : "It's a Draw!";
    resultScreen.classList.remove('hidden');
}

function handleCellClick(e) {
    const cell = e.target;
    if (cell.textContent !== '' || !gameActive) {
        return;
    }

    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin()) {
        endGame(currentPlayer);
    } else if (checkDraw()) {
        endGame(null);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `${currentPlayer}'s turn`;
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
document.getElementById('newGameButton').addEventListener('click', function() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    restartGame();
});
