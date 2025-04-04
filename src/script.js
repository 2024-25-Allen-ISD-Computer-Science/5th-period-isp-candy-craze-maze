const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2,
  1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1,
  1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1,
  1, 2, 1, 2, 1, 2, 3, 2, 2, 2, 1, 3, 2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1,
  1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 3, 2, 2, 2, 1,
  1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 2, 1,
  1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1,
  1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 3, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1,
  1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 3, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1,
  1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2, 2, 3, 2, 1,
  1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1,
  1, 2, 2, 2, 2, 3, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];


const gameContainer = document.getElementById("game");
function createMaze() {
    layout.forEach((cell,index) => {
        const div = document.createElement("div");
        div.id = `cell-${index}`;
        div.classList.add(cell === 1 ? "wall" : cell === 2 ? "collectible" : cell === 3 ? "power-pellet" : "path");
        gameContainer.appendChild(div);
    });
}

createMaze();

const sprite = document.getElementById("sprite");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");


let x = 0;
let y = 600; 
let score = 0;

let normalStep = 40;
let fastStep = 80;
let currentStep = normalStep;

function moveSprite(dx, dy) {

    const currentColumn = Math.floor(x / 40);
    const currentRow = Math.floor(y / 40);

    const targetColumn = currentColumn + dx / 40;
    const targetRow = currentRow + dy / 40;

    const targetIndex = (targetRow * 30) + targetColumn;

    if (
        targetColumn >= 0 &&
        targetColumn < 30 &&
        targetRow >= 0 &&
        targetRow < layout.length / 30 &&
        layout[targetIndex] !== (1)
    ) {
        x += dx;
        y += dy;
        
        if (layout[targetIndex] === 2) {
            layout[targetIndex] = 0;
            const targetCell = document.getElementById(`cell-${targetIndex}`);
           
            targetCell.classList.remove("collectible");
            targetCell.classList.add("path");
           
            score += 1;

            const scoreboard = document.getElementById("scoreboard");
            scoreboard.innerText = `Score: ${score}`;
        }
        if(layout[targetIndex] === 3) {
          layout[targetIndex] = 0;
          const targetCell = document.getElementById(`cell-${targetIndex}`);
         
          targetCell.classList.remove("power-pellet");
          targetCell.classList.add("path");
         
          score += 2;

          const scoreboard = document.getElementById("scoreboard");
          scoreboard.innerText = `Score: ${score}`;

          currentStep = fastStep; 

            setTimeout(() => {
                currentStep = normalStep; 
            }, 5000);
      }

        const container = document.getElementById("game-container");
        const maxX = container.offsetWidth - sprite.offsetWidth;
        const maxY = container.offsetHeight - sprite.offsetHeight;

        x = Math.max(0, Math.min(maxX, x));
        y = Math.max(0, Math.min(maxY, y));

        sprite.style.position = "absolute";
        sprite.style.left = `${x}px`;
        sprite.style.top = `${y}px`;
    }else {
        console.log("Blocked by wall or out of bounds");
    }
}



document.addEventListener("keydown", (event) => {
    
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        event.preventDefault();
    }
    switch (event.key) {
        case "ArrowUp":
            console.log("Move up");
            moveSprite(0, -currentStep);
            break;
        case "ArrowDown":
            console.log("Move down");
            moveSprite(0, currentStep);
            break;
        case "ArrowLeft":
            moveSprite(-currentStep, 0);
            break;
        case "ArrowRight":
            moveSprite(currentStep, 0);
            break;
    }
});


let timeLeft = 60; 
let timerInterval; 
let isGameRunning = false; 
let isPaused = false; 
let redJelloTimeout;
let greenJelloInterval;

document.addEventListener("keydown", startGameOnMove);

/*document.getElementById("stop-button").addEventListener("click", () => {
  if (isGameRunning) {
    isGameRunning = false; 
    stopTimer(); 
    stopJellos();
    console.log("Game stopped!"); 
  }
});
*/

document.getElementById("pause-button").addEventListener("click", () => {
  if (isGameRunning && !isPaused) {
    isPaused = true;
    clearInterval(timerInterval);
    stopJellos();
    console.log("Game paused!");
  }
});

document.getElementById("unpause-button").addEventListener("click", () => {
  if (isGameRunning && isPaused) {
    isPaused = false;
    startTimer();
    resumeJellos();
    console.log("Game resumed!");
  }
});

function startGameOnMove() {
  if (!isGameRunning) {
    isGameRunning = true; 
    startTimer(); 
    console.log("Game started!");
    greenJelloInterval = setInterval(updateGreenJello, 500);

    function startRedJello() {
      updateRedJello(); 
      redJelloInterval = setTimeout(startRedJello, redJelloSpeed);
    }
    startRedJello();
    document.removeEventListener("keydown", startGameOnMove);
  }
}

function startTimer() {
  const timerElement = document.getElementById("timer");

  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (!isPaused && timeLeft > 0) {
      timeLeft--; 
      timerElement.textContent = `Time Left: ${timeLeft}`; 
    } else if (timeLeft === 0) {
      stopTimer(); 
      alert("Time's up! Game Over!");
    }
  }, 1000); 
}

function stopTimer() {
  clearInterval(timerInterval); 
}

function stopJellos() {
  clearInterval(greenJelloInterval);  
  clearTimeout(redJelloInterval);   
}

function resumeJellos() {
  greenJelloInterval = setInterval(updateGreenJello, 500);

  function startRedJello() {
    updateRedJello();
    redJelloInterval = setTimeout(startRedJello, redJelloSpeed);
  }
  startRedJello();
}


const cake = document.getElementById("sprite");
const greenJello = document.getElementById("green-position");
const redJello = document.getElementById("red-position");
let greenJelloPosition = {col: 29, row: 0};
const redJelloPosition = { col: 0, row: 1 };
const gridSize = 40;

function getGridPosition(x, y) {
    return { col: Math.floor(x / 40), row: Math.floor(y / 40) };
}


function getPixelPosition(col, row) {
    return { x: col * 40, y: row * 40 };
}


function findPathBFS(startCol, startRow, targetCol, targetRow, grid) {
    const rows = grid.length / 30; 
    const cols = 30; 

    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const prev = Array(rows).fill().map(() => Array(cols).fill(null));

    const queue = [];
    queue.push({ col: startCol, row: startRow });
    visited[startRow][startCol] = true;

    const directions = [
        { dc: 0, dr: -1 }, 
        { dc: 0, dr: 1 },  
        { dc: -1, dr: 0 }, 
        { dc: 1, dr: 0 }  
    ];

    while (queue.length > 0) {
        const { col, row } = queue.shift();

        if (col === targetCol && row === targetRow) {
            let path = [];
            let current = { col, row };
            while (prev[current.row][current.col] !== null) {
                path.push(current);
                current = prev[current.row][current.col];
            }
            path.reverse();
            return path;
        }

        for (const { dc, dr } of directions) {
            const newCol = col + dc;
            const newRow = row + dr;

            if (
                newCol >= 0 && newCol < cols &&
                newRow >= 0 && newRow < rows &&
                !visited[newRow][newCol] &&
                grid[newRow * cols + newCol] !== 1 
            ) {
                visited[newRow][newCol] = true;
                prev[newRow][newCol] = { col, row };
                queue.push({ col: newCol, row: newRow });
            }
        }
    }
    return []; 
}


function updateGreenJello() {
  if (!isPaused){
    const cakePos = getGridPosition(x, y); 
    const jelloPos = greenJelloPosition;

    const path = findPathBFS(jelloPos.col, jelloPos.row, cakePos.col, cakePos.row, layout);

    if (path.length > 1) {
        const nextStep = path[1];
        greenJelloPosition.col = nextStep.col;
        greenJelloPosition.row = nextStep.row;

        const pixelPos = getPixelPosition(nextStep.col, nextStep.row);
        greenJello.style.left = `${pixelPos.x}px`;
        greenJello.style.top = `${pixelPos.y}px`;
    } else {
        console.log("No valid path found for Green Jello!");
    }
  }
}

let redJelloSpeed = 1000; 
const minSpeed = 300; 
const maxSpeed = 300;
const speedIncreaseRate = 5;
const chaseThreshold = 30;
let gameTimeElapsed = 0;
let isRedJelloActive = false; 

function updateRedJello() {
  if (!isPaused) {
  const cakePos = getGridPosition(x, y);
  const jelloRedPos = redJelloPosition;

  const path = findPathBFS(jelloRedPos.col, jelloRedPos.row, cakePos.col, cakePos.row, layout);

  if (path.length > 1) {
    const nextStep = path[1];
    
    redJelloPosition.col = nextStep.col;
    redJelloPosition.row = nextStep.row;

    const pixelPos = getPixelPosition(nextStep.col, nextStep.row);
    redJello.style.left = `${pixelPos.x}px`;
    redJello.style.top = `${pixelPos.y}px`;
  } else {
    console.log("No valid path found for Red Jello!");
  }

  
  if (gameTimeElapsed >= 5) {
    isRedJelloActive = true;

    if (redJelloSpeed > minSpeed) {
      redJelloSpeed -= speedIncreaseRate; 
    }
  }

  if (gameTimeElapsed >= chaseThreshold) {
    if (redJelloSpeed > maxSpeed) {
      redJelloSpeed = maxSpeed;
    }
  }
  }
  gameTimeElapsed++;

}





let lives = 3;
const livesDisplay = document.getElementById("lives");
updateLivesDisplay();

function updateLivesDisplay() {
  livesDisplay.textContent = `Lives: ${lives}`;
}

let isResetting = false;

function checkCollision() {
  if (isResetting) return;

  const cakePos = getGridPosition(x, y);
  const greenPos = getGridPosition(
    parseInt(greenJello.style.left) || greenJelloPosition.col * gridSize, 
    parseInt(greenJello.style.top) || greenJelloPosition.row * gridSize
  );

  const redPos = getGridPosition(
    parseInt(redJello.style.left) || redJelloPosition.col * gridSize, 
    parseInt(redJello.style.top) || redJelloPosition.row * gridSize
  );

  if ((cakePos.col === greenPos.col && cakePos.row === greenPos.row) || (cakePos.col === redPos.col && cakePos.row === redPos.row)) {
    isResetting = true;
    lives--;
    updateLivesDisplay();

    clearInterval(timerInterval);
    stopJellos();

    if (lives > 0) {
      setTimeout(() => {
        x = 0;
        y = 600;
        sprite.style.left = `${x}px`;
        sprite.style.top = `${y}px`;
        
        greenJelloPosition = { col: 29, row: 0 };
        redJelloPosition.col = 0;
        redJelloPosition.row = 1;
        
        let greenPixel = getPixelPosition(greenJelloPosition.col, greenJelloPosition.row);
        greenJello.style.left = `${greenPixel.x}px`;
        greenJello.style.top = `${greenPixel.y}px`;
        let redPixel = getPixelPosition(redJelloPosition.col, redJelloPosition.row);
        redJello.style.left = `${redPixel.x}px`;
        redJello.style.top = `${redPixel.y}px`;
        
        
        startTimer();
        resumeJellos();
        isResetting = false;
      }, 500);
  
    } else {
      setTimeout(() => {
        alert("Game Over!");
        location.reload();  
  }, 100);
}
}
}
setInterval(checkCollision, 100);
