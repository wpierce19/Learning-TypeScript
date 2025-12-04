import Gameboard from './Gameboard.js';

class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
    this.pastMoves = new Set();
  }

  attack(opponentBoard, x, y) {
    if (this.pastMoves.has(`${x},${y}`)) {
      throw new Error('Invalid move. Position already attacked.');
    }
    if (x < 0 || x >= opponentBoard.size || y < 0 || y >= opponentBoard.size) {
      throw new Error('Invalid move. Coordinates out of bounds.');
    }
    this.pastMoves.add(`${x},${y}`);
    return opponentBoard.receiveAttack(x, y); // Return hit or miss
  }

  randomAttack(opponentBoard) {
    let x, y;
    do {
      x = Math.floor(Math.random() * opponentBoard.size);
      y = Math.floor(Math.random() * opponentBoard.size);
    } while (this.pastMoves.has(`${x},${y}`));
    return this.attack(opponentBoard, x, y);
  }
}

export default Player;