const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 3, 1, 1, 1, 3, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 1,
    1, 3, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 3, 1,
    1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
    0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 2, 1,
    1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1,
    1, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 3, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];
const gameContainer = document.getElementById("game");
function createMaze() {
    layout.forEach(cell => {
        const div = document.createElement("div");
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
let y = 230; 

const step = 10;

function moveSprite(dx, dy) {
    x += dx;
    y += dy;

    
    const container = document.getElementById("game-container");
    const maxX = container.offsetWidth - sprite.offsetWidth;
    const maxY = container.offsetHeight - sprite.offsetHeight;

    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));

    sprite.style.position = "absolute";
    sprite.style.left = `${x}px`;
    sprite.style.top = `${y}px`;
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



