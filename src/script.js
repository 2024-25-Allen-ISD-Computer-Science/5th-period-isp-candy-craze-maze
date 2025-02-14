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

document.addEventListener("keydown", startGameOnMove);

document.getElementById("stop-button").addEventListener("click", () => {
  if (isGameRunning) {
    isGameRunning = false; 
    stopTimer(); 
    console.log("Game stopped!"); 
  }
});

document.getElementById("pause-button").addEventListener("click", () => {
  if (isGameRunning && !isPaused) {
    isPaused = true;
    clearInterval(timerInterval);
    console.log("Game paused!");
  }
});

document.getElementById("unpause-button").addEventListener("click", () => {
  if (isGameRunning && isPaused) {
    isPaused = false;
    startTimer();
    console.log("Game resumed!");
  }
});

function startGameOnMove() {
  if (!isGameRunning) {
    isGameRunning = true; 
    startTimer(); 
    console.log("Game started!");
    
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



const cake = document.getElementById("sprite");
const greenJello = document.getElementById("green-position");
const redJello = document.getElementById("red-position");

let jelloX = 1160; 
let jelloY = 600; 

function isWall(x, y) {

  const col = Math.floor(x / 40);
  const row = Math.floor(y / 40);
  const index = row * 30 + col; 
  return layout[index] === 1;
}

function moveJello() {
  const cakeX = parseInt(cake.style.left || 0, 10);
  const cakeY = parseInt(cake.style.top || 0, 10);

  const cakeColumn = Math.floor(cakeX / step); 
  const cakeRow = Math.floor(cakeY / step); 

  const jelloColumn = Math.floor(jelloX / step); 
  const jelloRow = Math.floor(jelloY / step);

  let dx = 0;
  let dy = 0;

  if (cakeColumn < jelloColumn) {
      dx = -step; 
  } else if (cakeColumn > jelloColumn) {
      dx = step;
  }

  if (cakeRow < jelloRow) {
      dy = -step; 
  } else if (cakeRow > jelloRow) {
      dy = step;
  }

  const newJelloX = jelloX + dx;
  const newJelloY = jelloY + dy;

  if (!isWall(newJelloX, newJelloY)) {
      jelloX = newJelloX;
      jelloY = newJelloY;

      greenJello.style.position = "absolute";
      greenJello.style.left = `${jelloX}px`;
      greenJello.style.top = `${jelloY}px`;
  }
}

function startJelloMovement() {
  setInterval(moveJello, 300);
}
startJelloMovement();

class Node {
  constructor(x, y, parent = null) {
      this.x = x;
      this.y = y;
      this.g = 0; 
      this.h = 0; 
      this.f = 0;
      this.parent = parent;
  }
}

function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function aStar(startX, startY, targetX, targetY) {
  const openList = [];
  const closedList = [];
  const startNode = new Node(startX, startY);
  const targetNode = new Node(targetX, targetY);

  openList.push(startNode);

  while (openList.length > 0) {
      let currentNode = openList.reduce((prev, curr) => (prev.f < curr.f ? prev : curr));

      if (currentNode.x === targetNode.x && currentNode.y === targetNode.y) {
          let path = [];
          let temp = currentNode;
          while (temp !== null) {
              path.push([temp.x, temp.y]);
              temp = temp.parent;
          }
          return path.reverse();
      }

      openList.splice(openList.indexOf(currentNode), 1);
      closedList.push(currentNode);

      const neighbors = [
          { x: 0, y: -1 }, 
          { x: 0, y: 1 }, 
          { x: -1, y: 0 },
          { x: 1, y: 0 } 
      ];

      for (let neighbor of neighbors) {
          const nx = currentNode.x + neighbor.x;
          const ny = currentNode.y + neighbor.y;

          
          if (nx < 0 || nx >= 30 || ny < 0 || ny >= layout.length / 30 || layout[nx + ny * 30] === 1) {
              continue;
          }

          const neighborNode = new Node(nx, ny, currentNode);
          if (closedList.some(node => node.x === neighborNode.x && node.y === neighborNode.y)) {
              continue;
          }


          neighborNode.g = currentNode.g + 1;
          neighborNode.h = heuristic(neighborNode, targetNode);
          neighborNode.f = neighborNode.g + neighborNode.h;

         
          if (!openList.some(node => node.x === neighborNode.x && node.y === neighborNode.y) || neighborNode.f < openList.find(node => node.x === neighborNode.x && node.y === neighborNode.y).f) {
              openList.push(neighborNode);
          }
      }
  }

  return [];
}