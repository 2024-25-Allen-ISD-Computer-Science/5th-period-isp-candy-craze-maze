console.log("Script is working!");
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


let x = 200;
let y = 200; 

const step = 10;

function moveSprite(dx, dy) {
    x += dx;
    y += dy;

    
    const container = document.getElementById("game-container");
    const maxX = container.offsetWidth - sprite.offsetWidth;
    const maxY = container.offsetHeight - sprite.offsetHeight;
//container or sprite might be null

    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));

    sprite.style.position = "absolute";
    sprite.style.left = `${x}px`;
    sprite.style.top = `${y}px`;
}


document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            moveSprite(0, -step);
            break;
        case "ArrowDown":
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

document.getElementById("up").addEventListener("click", () => moveSprite(0, -step));
document.getElementById("down").addEventListener("click", () => moveSprite(0, step));
document.getElementById("left").addEventListener("click", () => moveSprite(-step, 0));
document.getElementById("right").addEventListener("click", () => moveSprite(step, 0));

/*var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");
var spritobject =
{
    x:0,
    y:0,
    width: 47,
    height: 40
};


var cake = Object.create(spriteObject);
cake.x = 100;
cake.y = 100;
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "cake-pic.png";
var Xspeed = 0;
var Yspeed = 0;
var moveLeft = false;
var moveRight = false;
var moveUp = false;
var moveDown = false;




window.addEventListener("keydown", function(e)
{
    switch (e.key)
    {
       case "ArrowUp":
           moveUp = true;
           break;
       case "ArrowDown":
           moveDown = true;
           break;
       case "ArrowLeft":
           moveLeft = true;
           break;
       case "ArrowRight":
           moveRight = true;
           break;
   }
     
}, false);


window.addEventListener("keyup", function(e)
{
    switch (e.key)
    {
       case "ArrowUp":
           moveUp = false;
           break;
       case "ArrowDown":
           moveDown = false;
           break;
       case "ArrowLeft":
           moveLeft = false;
           break;
       case "ArrowRight":
           moveRight = false;
           break;
   }  
     
}, false);


function update()
{
    window.requestAnimationFrame(update);
   
    Xspeed = 0;
    Yspeed = 0;


    if(moveUp)
        {
            Yspeed = -5;
        }
    if(moveDown)
        {
            Yspeed = 5;
        }
    if(moveLeft)
        {
            Xspeed = -5;
        }
    if(moveRight)
        {
            Xspeed = 5;
        }
    cake.x += Xspeed;
    cake.y += Yspeed;


    drawingSurface.clearRect(0, 0, canvas.width, canvas,height);
    drawingSurface.drawImage(image, cake.x, cake.y, cake.width, cake.height);
}


image.addEventListener("load", function() {
    update();
}, false); */