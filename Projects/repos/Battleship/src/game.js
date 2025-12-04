import './styles.css';
import Player from './Player.js';
import Ship from './Ship.js';
import Gameboard from './Gameboard.js';

// Initialize players
const player = new Player();
const computer = new Player(true);
let currentPlayer = player;
let gameStarted = false;

const ships = [
  new Ship(5),
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
];

// Function to render ships in the ship container
function renderShips() {
  const shipsContainer = document.getElementById('ship-container');
  shipsContainer.innerHTML = '';

  ships.forEach((ship) => {
    const shipElement = document.createElement('div');
    shipElement.className = 'ship';
    shipElement.draggable = true;
    shipElement.dataset.length = ship.length;
    shipElement.textContent = `Ship ${ship.length}`;
    shipsContainer.appendChild(shipElement);
  });
}

// Function to render the gameboard
function renderBoard(board, elementId, showShips = false) {
  const boardElement = document.getElementById(elementId);
  boardElement.innerHTML = '';

  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `30px repeat(${board.size}, 30px)`;
  grid.style.gridTemplateRows = `30px repeat(${board.size}, 30px)`;
  boardElement.appendChild(grid);

  const emptyCorner = document.createElement('div');
  grid.appendChild(emptyCorner);

  for (let j = 0; j < board.size; j++) {
    const columnLabel = document.createElement('div');
    columnLabel.textContent = String.fromCharCode(65 + j);
    columnLabel.classList.add('label');
    grid.appendChild(columnLabel);
  }

  for (let i = 0; i < board.size; i++) {
    const rowLabel = document.createElement('div');
    rowLabel.textContent = i;
    rowLabel.classList.add('label');
    grid.appendChild(rowLabel);

    for (let j = 0; j < board.size; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.x = i;
      cell.dataset.y = j;

      if (showShips) {
        const ship = board.grid[i][j];
        if (ship instanceof Ship) {
          cell.classList.add('ship');
        }
      }

      if (board.missedShots.some((miss) => miss.x === i && miss.y === j)) {
        cell.classList.add('miss');
      }

      if (board.grid[i][j]?.hits > 0) {
        cell.classList.add('hit');
      }

      grid.appendChild(cell);
    }
  }
}

// Place computer ships randomly
function placeComputerShips() {
  const shipSizes = [5, 4, 3, 3, 2];
  shipSizes.forEach((size) => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * computer.gameboard.size);
      const y = Math.floor(Math.random() * computer.gameboard.size);
      const isHorizontal = Math.random() > 0.5;
      try {
        const ship = new Ship(size);
        computer.gameboard.placeShip(ship, { x, y }, isHorizontal);
        placed = true;
      } catch {
        // Retry placement if invalid
      }
    }
  });
}

// Drag-and-drop setup for placing ships
function setupDragAndDrop() {
  const shipsContainer = document.getElementById('ship-container');
  const boardElement = document.getElementById('player-board');
  const startButton = document.getElementById('start-game');

  shipsContainer.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('length', event.target.dataset.length);
  });

  boardElement.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  boardElement.addEventListener('drop', (event) => {
    event.preventDefault();

    const length = parseInt(event.dataTransfer.getData('length'), 10);
    const x = parseInt(event.target.dataset.x, 10);
    const y = parseInt(event.target.dataset.y, 10);

    const ship = ships.find((s) => s.length === length);
    if (ship) {
      try {
        player.gameboard.placeShip(ship, { x, y }, true); // Default horizontal placement
        ships.splice(ships.indexOf(ship), 1);
        renderBoard(player.gameboard, 'player-board', true);
        renderShips();

        if (ships.length === 0) {
          startButton.disabled = false;
        }
      } catch {
        alert('Invalid ship placement. Try again.');
      }
    }
  });
}

// Start the game
document.getElementById('start-game').addEventListener('click', () => {
  if (ships.length > 0) {
    alert('Place all your ships first!');
    return;
  }

  gameStarted = true;
  document.getElementById('start-game').disabled = true;
  document.getElementById('ship-container').innerHTML = '';

  renderBoard(player.gameboard, 'player-board', true);
  renderBoard(computer.gameboard, 'computer-board');

  document.getElementById('computer-board').addEventListener('click', (event) => {
    if (!gameStarted || currentPlayer !== player) return;

    const x = parseInt(event.target.dataset.x, 10);
    const y = parseInt(event.target.dataset.y, 10);

    try {
      const hit = player.attack(computer.gameboard, x, y);
      renderBoard(computer.gameboard, 'computer-board', false);

      if (hit) {
        console.log('Hit! Cell:', x, y);
      } else {
        console.log('Miss! Cell:', x, y);
      }

      if (computer.gameboard.allShipsSunk()) {
        alert('You win!');
        gameStarted = false;
        return;
      }

      // Computer's turn
      currentPlayer = computer;
      setTimeout(() => {
        computer.randomAttack(player.gameboard);
        renderBoard(player.gameboard, 'player-board', true);

        if (player.gameboard.allShipsSunk()) {
          alert('Computer wins!');
          gameStarted = false;
        } else {
          currentPlayer = player;
        }
      }, 1000);
    } catch (error) {
      console.error(error.message);
    }
  });
});

// Initialize game
placeComputerShips();
renderBoard(player.gameboard, 'player-board', true);
renderBoard(computer.gameboard, 'computer-board');
renderShips();
setupDragAndDrop();