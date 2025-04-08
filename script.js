let currentPlayer = 'X';
let gameBoard = Array(9).fill('');
let gameActive = true;

const board = document.getElementById('board');
const statusText = document.getElementById('status');

function createBoard() {
  board.innerHTML = '';
  gameBoard.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index = index;
    div.addEventListener('click', handleCellClick);
    div.textContent = cell;
    board.appendChild(div);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!gameBoard.includes('')) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

function restartGame() {
  gameBoard = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = "Player X's Turn";
  createBoard();
}

createBoard();
