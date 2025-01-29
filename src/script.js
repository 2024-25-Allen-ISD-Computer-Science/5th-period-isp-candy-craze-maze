const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0,
    1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 1, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
    1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 3, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 0, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
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

const step = 40;

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
        
        if (layout[targetIndex] === 2 || layout[targetIndex] === 3 ) {
            layout[targetIndex] = 0;
            const targetCell = document.getElementById(`cell-${targetIndex}`);
           
            targetCell.classList.remove("power-pellet");
            targetCell.classList.remove("collectible");
            targetCell.classList.add("path");
           
            score += 1;

            const scoreboard = document.getElementById("scoreboard");
            scoreboard.innerText = `Score: ${score}`;
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
            moveSprite(0, -step);
            break;
        case "ArrowDown":
            console.log("Move down");
            moveSprite(0, step);
            break;
        case "ArrowLeft":
            moveSprite(-step, 0);
            break;
        case "ArrowRight":
            moveSprite(step, 0);
            break;
    }
});


let timeLeft = 60; 
let timerInterval; 
let isGameRunning = false; 

document.getElementById("start-button").addEventListener("click", () => {
  if (!isGameRunning) {
    isGameRunning = true; 
    startTimer(); 
    console.log("Game started!"); 
  }
});

document.getElementById("stop-button").addEventListener("click", () => {
  if (isGameRunning) {
    isGameRunning = false; 
    stopTimer(); 
    console.log("Game stopped!"); 
  }
});

function startTimer() {
  const timerElement = document.getElementById("timer");
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--; 
      timerElement.textContent = `Time Left: ${timeLeft}`; 
    } else {
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

function moveJello(jello) {
    const cakeRect = cake.getBoundingClientRect();
    const jelloRect = jello.getBoundingClientRect();

    let cakeX = cake.offsetLeft;
    let cakeY = cake.offsetTop;
    let jelloX = jello.offsetLeft;
    let jelloY = jello.offsetTop;

    let speed = 2;

  
    if (jelloX < cakeX) {
        jello.style.left = (jelloX + speed) + "px";
    } else if (jelloX > cakeX) {
        jello.style.left = (jelloX - speed) + "px";
    }

    if (jelloY < cakeY) {
        jello.style.top = (jelloY + speed) + "px";
    } else if (jelloY > cakeY) {
        jello.style.top = (jelloY - speed) + "px";
    }
}

setInterval(() => {
  moveJello(greenJello);
  moveJello(redJello);
}, 100);