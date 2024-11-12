const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 
    1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 
    1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 
    1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 
    1, 2, 1, 0, 0, 0, 0, 1, 0, 1, 1, 
    1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 

];
const gameContainer = document.getElementById("game");
function createMaze() {
    layout.forEach(cell => {
        const div = document.createElement("div");
        div.classList.add(cell === 1 ? "wall" : cell === 2 ? "collectible" : "path");
        gameContainer.appendChild(div);
    });
}

createMaze();
//Ths is placing the character on the grid

let cakePosition= {x: 5, y: 5};
function placecake() {
   const index = cakePosition.y * gridSize + cakePosition.x;
   cells[index].classList.add("cake");
}


document.addEventListener(keydown, (event) => {
   const speed = 10;

    switch (event.key) {
       case "ArrowUp":
           if (cakePosition.y > 0) cakePosition.y -= 1;
           break;
       case "ArrowDown":
           if (cakePosition.y < gridSize -1) cakePosition.y += 1;
           break;
       case "ArrowLeft":
           if (cakePosition.x > 0) cakePosition.x -= 1;
           break;
       case "ArrowRight":
           if (cakePosition.x < gridSize - 1) cakePosition.x -= 1;
           break;
   }
   updatePosition();
      
   }
)
