import Ship from './Ship.js';

class Gameboard {
    constructor(size = 10) {
      this.size = size;
      this.grid = Array.from({ length: size }, () => Array(size).fill(null)); // 2D grid
      this.missedShots = []; // Track missed shots
      this.ships = []; // List of placed ships
    }
  
    placeShip(ship, coordinates, isHorizontal = true) {
      const { x, y } = coordinates;
      const shipCoords = [];
  
      for (let i = 0; i < ship.length; i++) {
        const posX = isHorizontal ? x : x + i;
        const posY = isHorizontal ? y + i : y;
  
        if (posX >= this.size || posY >= this.size || this.grid[posX][posY]) {
          throw new Error('Invalid placement.');
        }
  
        shipCoords.push({ x: posX, y: posY });
      }
  
      shipCoords.forEach(({ x, y }) => {
        this.grid[x][y] = ship;
      });
  
      this.ships.push({ ship, coordinates: shipCoords });
    }
  
    receiveAttack(x, y) {
      if (this.grid[x][y] instanceof Ship) {
        this.grid[x][y].hit(); // Call the ship's hit method
        return true; // Indicate a hit
      } else {
        this.missedShots.push({ x, y }); // Record missed shot
        return false; // Indicate a miss
      }
    }
  
    allShipsSunk() {
      return this.ships.every(({ ship }) => ship.isSunk());
    }
  }
  
  export default Gameboard;