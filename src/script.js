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