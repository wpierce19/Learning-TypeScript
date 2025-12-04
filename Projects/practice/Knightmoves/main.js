function knightMoves(start,end)
{
    const directions = [
        [2, 1], [1, 2], [-1, 2], [-2, 1], // Moves to the "upper right" and "upper left"
        [-2, -1], [-1, -2], [1, -2], [2, -1] // Moves to the "lower left" and "lower right"
    ];

    const isValidMove = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

    const bfs = (start, end) => {
        const queue = [[start]]; // Queue of paths to explore
        const visited = new Set(); // Keep track of visited positions
        visited.add(start.toString()); // Mark the starting position as visited

        while (queue.length) {
            const path = queue.shift(); // Dequeue the first path
            const [x, y] = path[path.length - 1]; // Get the current position from the path

            // If the current position matches the end, return the path
            if (x === end[0] && y === end[1]) return path;

            // Explore all possible knight moves from the current position
            for (const [dx, dy] of directions) {
                const nextX = x + dx;
                const nextY = y + dy;

                // If the move is valid and not visited, add the new path to the queue
                if (isValidMove(nextX, nextY) && !visited.has([nextX, nextY].toString())) {
                    visited.add([nextX, nextY].toString()); // Mark the new position as visited
                    queue.push([...path, [nextX, nextY]]); // Enqueue the new path
                }
            }
        }
    };

    // Get the shortest path using BFS
    const path = bfs(start, end);

    // Output the results
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(square => console.log(square));

    // Return the path as an array of coordinates
    return path;
}

// Example usage
// Finds the shortest path for the knight from [0,0] to [1,2]
knightMoves([0, 0], [1, 2]);

// Finds the shortest path for the knight from [0,0] to [3,3]
knightMoves([0, 0], [3, 3]);

// Finds the shortest path for the knight from [3,3] to [0,0]
knightMoves([3, 3], [0, 0]);

// Finds the shortest path for the knight from [0,0] to [7,7]
knightMoves([0, 0], [7, 7]);