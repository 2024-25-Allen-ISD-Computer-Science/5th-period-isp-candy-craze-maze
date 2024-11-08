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
let cakeCharcaterPosition= {x: 0, y: 0};
function placecakeCharacter() {
   const index = cakeCharacterPosition.y * gridSize + cakeCharacterPosition.x;
   cells[index].classList.add("cakeCharacter");
}


document.addEventListener(keydown, (event) => {
   switch (event.key) {
       case "w":
           if (cakecharacterPosition.y > 0) cakecharacterPosition.y -= 1;
           break;
       case "s":
           if (cakecharacterPosition.y < gridSize -1) cakecharacterPosition.y += 1;
           break;
       case "a":
           if (cakecharacterPosition.x > 0) cakecharacterPosition.x -= 1;
           break;
       case "d":
           if (cakecharacterPosition.x < gridSize - 1) cakecharacterPosition.x -= 1;
           break;
   }
   placecakeCharcater();
      
   }
});
