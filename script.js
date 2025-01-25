const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // make empty boxes on the UI
    boxes.forEach((box, index) => {
        box.innerText ="";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newGameBtn.classList.remove('active');
    gameInfo.textContent = `Current Player - ${currentPlayer}`;

}
initGame();

boxes.forEach((box,index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; //Show in UI
        boxes[index].style.pointerEvents = 'none';
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkWin();
    }
}
function checkWin(){
    let answer = "";
    winningPosition.forEach((position) => {
        if ((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" ||gameGrid[position[2]] != "")
            && (gameGrid[position[0]] == gameGrid[position[1]] && gameGrid[position[1]] == gameGrid[position[2]])) {
            
                if(gameGrid[position[0]] == "X")
                    answer = "X";
                else
                    answer = "0";

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    })

    if(answer != ""){
        gameInfo.textContent = `Winner is ${answer} 🎉`;
        newGameBtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    })
    // Game Tied
    if(fillCount == 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener('click', initGame);