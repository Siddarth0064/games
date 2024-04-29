// Constants
const WIDTH = 14; // Width of the maze (number of squares)
const HEIGHT = 14; // Height of the maze (number of squares)
const CELL_SIZE = 32; // Size of each cell in pixels
const MAZE_LAYOUT = [
    // Maze layout: W = wall, D = dot, P = Pac-Man, R/B/P/O = ghost colors
    'WWWWWWWWWWWWWW',
    'WDDDDDDDDDDDDW',
    'WDWWDWDWWDWWDW',
    'WDWDWDWDWDWDWD',
    'WDWDDDRDDDDWDW',
    'WDWDWDWDWDWDWD',
    'WDWDWDWDWDWDWD',
    'WDWDWDWDWDWDWD',
    'WDWDWDWDWDWDWD',
    'WDDDDDDBDDDDDW',
    'WWWWWWWWWWWWWW'
];

let gameBoard = document.getElementById('game-board');
let scoreElement = document.getElementById('score');
let livesElement = document.getElementById('lives');
let score = 0;
let lives = 3;

// Pac-Man character
let pacman = {
    x: 1,
    y: 1,
    direction: 'right',
    element: null // Will store the Pac-Man element
};

// Ghosts with starting positions and colors
let ghosts = [
    {
        x: 7,
        y: 7,
        direction: 'left',
        color: 'red',
        element: null, // Will store the ghost element
        startX: 7, // Starting x position
        startY: 7, // Starting y position
        startDirection: 'left' // Starting direction
    },
    {
        x: 7,
        y: 8,
        direction: 'up',
        color: 'blue',
        element: null,
        startX: 7,
        startY: 8,
        startDirection: 'up'
    },
    {
        x: 6,
        y: 7,
        direction: 'down',
        color: 'pink',
        element: null,
        startX: 6,
        startY: 7,
        startDirection: 'down'
    },
    {
        x: 6,
        y: 8,
        direction: 'right',
        color: 'orange',
        element: null,
        startX: 6,
        startY: 8,
        startDirection: 'right'
    }
];

// Initialize the game board
function initGameBoard() {
    gameBoard.innerHTML = ''; // Clear the game board
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const square = document.createElement('div');
            square.className = 'square';
            const cell = MAZE_LAYOUT[y][x];
            if (cell === 'W') {
                square.classList.add('wall');
            } else if (cell === 'D') {
                const dot = document.createElement('div');
                dot.className = 'dot';
                square.appendChild(dot);
            }
            square.style.top = `${y * CELL_SIZE}px`;
            square.style.left = `${x * CELL_SIZE}px`;
            gameBoard.appendChild(square);
        }
    }
}

// Initialize the characters
function initCharacters() {
    // Pac-Man
    const pacmanElement = document.createElement('div');
    pacmanElement.className = 'pacman';
    pacmanElement.style.top = `${pacman.y * CELL_SIZE}px`;
    pacmanElement.style.left = `${pacman.x * CELL_SIZE}px`;
    pacman.element = pacmanElement;
    gameBoard.appendChild(pacmanElement);
    
    // Ghosts
    ghosts.forEach((ghost) => {
        const ghostElement = document.createElement('div');
        ghostElement.className = `ghost ghost-${ghost.color}`;
        ghostElement.style.top = `${ghost.y * CELL_SIZE}px`;
        ghostElement.style.left = `${ghost.x * CELL_SIZE}px`;
        ghost.element = ghostElement;
        gameBoard.appendChild(ghostElement);
    });
}

// Move Pac-Man
function movePacman(direction) {
    const { x, y } = pacman;
    let newX = x;
    let newY = y;

    if (direction === 'left' && canMove(x - 1, y)) newX--;
    if (direction === 'right' && canMove(x + 1, y)) newX++;
    if (direction === 'up' && canMove(x, y - 1)) newY--;
    if (direction === 'down' && canMove(x, y + 1)) newY++;

    // Update Pac-Man's position if movement is valid
    if (newX !== x || newY !== y) {
        pacman.x = newX;
        pacman.y = newY;

        // Update Pac-Man's position on the board
        pacman.element.style.top = `${pacman.y * CELL_SIZE}px`;
        pacman.element.style.left = `${pacman.x * CELL_SIZE}px`;

        // Check for collisions with dots
        const currentSquare = MAZE_LAYOUT[pacman.y][pacman.x];
        if (currentSquare === 'D') {
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
            // Update the maze layout to remove the dot
            MAZE_LAYOUT[pacman.y][pacman.x] = ' ';
            // Remove the dot from the board
            const squareIndex = pacman.y * WIDTH + pacman.x;
            const squareElement = gameBoard.querySelectorAll('.square')[squareIndex];
            const dotElement = squareElement.querySelector('.dot');
            if (dotElement) {
                dotElement.remove();
            }
        }

        // Check for collisions with ghosts
        if (checkGhostCollision()) {
            lives--;
            livesElement.textContent = `Lives: ${lives}`;
            if (lives === 0) {
                endGame();
            } else {
                resetCharacters();
            }
        }
    }
}

// Check if Pac-Man can move to a cell
function canMove(x, y) {
    return MAZE_LAYOUT[y][x] !== 'W';
}

// Move ghosts
function moveGhosts() {
    ghosts.forEach((ghost) => {
        // Simple ghost AI: Move randomly
        const directions = ['left', 'right', 'up', 'down'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        
        // Update the ghost's direction based on the random choice
        ghost.direction = randomDirection;
        
        // Move the ghost based on the chosen direction
        if (randomDirection === 'left' && canMove(ghost.x - 1, ghost.y)) {
            ghost.x--;
        } else if (randomDirection === 'right' && canMove(ghost.x + 1, ghost.y)) {
            ghost.x++;
        } else if (randomDirection === 'up' && canMove(ghost.x, ghost.y - 1)) {
            ghost.y--;
        } else if (randomDirection === 'down' && canMove(ghost.x, ghost.y + 1)) {
            ghost.y++;
        }
        
        // Update ghost position on the board
        ghost.element.style.top = `${ghost.y * CELL_SIZE}px`;
        ghost.element.style.left = `${ghost.x * CELL_SIZE}px`;
    });
}

// Check for collisions between Pac-Man and ghosts
function checkGhostCollision() {
    return ghosts.some(ghost => ghost.x === pacman.x && ghost.y === pacman.y);
}

// Reset characters to starting positions
function resetCharacters() {
    // Reset Pac-Man's position
    pacman.x = 1;
    pacman.y = 1;
    pacman.direction = 'right';
    pacman.element.style.top = `${pacman.y * CELL_SIZE}px`;
    pacman.element.style.left = `${pacman.x * CELL_SIZE}px`;
    
    // Reset ghosts' positions
    ghosts.forEach(ghost => {
        ghost.x = ghost.startX;
        ghost.y = ghost.startY;
        ghost.direction = ghost.startDirection;
        ghost.element.style.top = `${ghost.y * CELL_SIZE}px`;
        ghost.element.style.left = `${ghost.x * CELL_SIZE}px`;
    });
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Your final score is: ${score}`);
}

// Initialize the game
function initGame() {
    initGameBoard();
    initCharacters();
    
    // Handle keyboard input for Pac-Man's movement
    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') movePacman('left');
        if (event.key === 'ArrowRight') movePacman('right');
        if (event.key === 'ArrowUp') movePacman('up');
        if (event.key === 'ArrowDown') movePacman('down');
    });
    
    // Game loop
    gameInterval = setInterval(() => {
        moveGhosts();
        checkGhostCollision();
    }, 300);
}

// Start the game
initGame();
