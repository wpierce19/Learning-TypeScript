class Ship {
    constructor(length) {
      this.length = length; // Length of the ship
      this.hits = 0; // Number of hits the ship has taken
    }
  
    // Record a hit on the ship
    hit() {
      this.hits += 1;
    }
  
    // Check if the ship is sunk
    isSunk() {
      return this.hits >= this.length;
    }
  }
  
  export default Ship;