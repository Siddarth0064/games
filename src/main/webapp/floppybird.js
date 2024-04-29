const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let gameover = false;
let countdown = 3; // Countdown timer before starting the game

const bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    velocity: 0,
    gravity: 0.5,
    jump: 10,
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f56c42'; // Orange color
        ctx.fill();
        ctx.closePath();
    },
    flap: function() {
        this.velocity = -this.jump;
    },
    update: function() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }
};

const pipes = [];

document.addEventListener('keydown', function(event) {
    if (!gameover && event.code === 'Space') {
        bird.flap();
    }
});

function generatePipes() {
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        const gapHeight = 200;
        const upperHeight = Math.random() * (canvas.height - gapHeight - 100) + 50;
        const lowerHeight = canvas.height - upperHeight - gapHeight;
        pipes.push({
            x: canvas.width,
            upperHeight: upperHeight,
            lowerHeight: lowerHeight,
            width: 50
        });
    }
}

function drawPipes() {
    for (let i = 0; i < pipes.length; i++) {
        ctx.fillStyle = '#32a852'; // Green color
        ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].upperHeight);
        ctx.fillRect(pipes[i].x, canvas.height - pipes[i].lowerHeight, pipes[i].width, pipes[i].lowerHeight);
    }
}

function updatePipes() {
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= 2;
        if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }
}

function checkCollision() {
    if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.height) {
        return true;
    }
    for (let i = 0; i < pipes.length; i++) {
        if (bird.x + bird.radius > pipes[i].x && bird.x - bird.radius < pipes[i].x + pipes[i].width &&
            (bird.y - bird.radius < pipes[i].upperHeight || bird.y + bird.radius > canvas.height - pipes[i].lowerHeight)) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.draw();
    drawPipes();
    ctx.fillStyle = '#000'; // Black color
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 40);

    if (countdown > 0) {
        ctx.fillText(`Starting in ${countdown}...`, canvas.width / 2 - 80, canvas.height / 2);
    }
}

function update() {
    bird.update();
    updatePipes();
    if (checkCollision()) {
        gameover = true;
    }
    if (gameover) {
        ctx.fillStyle = '#000'; // Black color
        ctx.font = '48px Arial';
        ctx.fillText('Game Over', 100, canvas.height / 2 - 50);
        ctx.font = '24px Arial';
        ctx.fillText(`Score: ${score}`, 150, canvas.height / 2 + 50);
        ctx.fillText('Press R to Restart', 130, canvas.height / 2 + 100);
        ctx.fillText('Press H to go to Home Page', 90, canvas.height / 2 + 150);
    }
}

function gameLoop() {
    if (countdown > 0) {
        countdown--;
    } else {
        if (!gameover) {
            generatePipes();
        }
        draw();
        update();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('keydown', function(event) {
    if (gameover && event.code === 'KeyR') {
        restartGame();
    } else if (gameover && event.code === 'KeyH') {
        goToHomePage();
    }
});

function restartGame() {
    score = 0;
    gameover = false;
    countdown = 3;
    bird.y = canvas.height / 2;
    pipes.length = 0;
}

function goToHomePage() {
    window.location.href = 'homepage.html'; // Change 'homepage.html' to your home page URL
}
const countdownElement = document.getElementById('countdown');
//let countdown = 3;

function startCountdown() {
    countdownElement.style.display = 'block';
    countdownElement.textContent = countdown;
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            startGame();
        } else {
            countdownElement.textContent = countdown;
        }
    }, 1000);
}
startCountdown();

function showButtonContainer() {
    document.getElementById('button-container').style.display = 'block';
}

// Function to hide the button container
function hideButtonContainer() {
    document.getElementById('button-container').style.display = 'none';
}

// Game over function (call this when the game is over)
function gameOver() {
    showButtonContainer();
}

function startCountdown() {
    countdownElement.style.display = 'block';
    countdownElement.textContent = countdown;
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = 'none';
            startGame();
        } else {
            countdownElement.textContent = countdown;
        }
    }, 1000);
}


