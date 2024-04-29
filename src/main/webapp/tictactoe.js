/**
 * 
 */
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let playerMode = '';

function startGame(mode) {
    playerMode = mode;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('player-names').style.display = 'block';
}

function initializePlayers() {
    player1 = document.getElementById('player1Name').value || 'Player 1';
    if (playerMode === 'player') {
        player2 = document.getElementById('player2Name').value || 'Player 2';
    } else {
        player2 = 'AI';
    }
    document.getElementById('player-names').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
    document.getElementById('message').textContent = `${player1}'s turn (X) vs ${player2} (O)`;
}

function makeMove(index) {
    if (!cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        if (checkWin()) {
            document.getElementById('message').textContent = `${currentPlayer} wins!`;
            cells.forEach(cell => cell.onclick = null);
        } else if (checkDraw()) {
            document.getElementById('message').textContent = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('message').textContent = `${currentPlayer === 'X' ? player1 : player2}'s turn (${currentPlayer}) vs ${currentPlayer === 'X' ? player2 : player1} (O)`;
        }
    }
}




let cells = document.querySelectorAll('.cell');
let isFirstMove = true;
let lastMoveIndex;

function makeMove(index) {
    if (!cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        lastMoveIndex = index;
        if (checkDraw()) {
            document.getElementById('message').textContent = 'Draw!';
            cells.forEach(cell => cell.textContent = '');
            isFirstMove = true;
        } else if (checkWin()) {
            document.getElementById('message').innerHTML = `<span class="winner">${currentPlayer === 'X' ? player1 : player2} wins!</span>`;
            cells.forEach(cell => cell.onclick = null);
            document.getElementById('board').classList.add('celebrate');
        } else {
            if (isFirstMove) {
                isFirstMove = false;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('message').textContent = `${currentPlayer === 'X' ? player1 : player2}'s turn (${currentPlayer}) vs ${currentPlayer === 'X' ? player2 : player1} (O)`;
        }
    } else if (isFirstMove && !checkWin() && !checkDraw()) {
        isFirstMove = false;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('message').textContent = `${currentPlayer === 'X' ? player1 : player2}'s turn (${currentPlayer}) vs ${currentPlayer === 'X' ? player2 : player1} (O)`;
    }
}


function checkWin() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent);
}
function goToHomePage() {
    window.location.href = "homepage.html"; // Replace "index.html" with the URL of your home page
}



