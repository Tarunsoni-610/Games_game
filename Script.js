


let boxes = document.querySelectorAll(".box");
let newGamebtn = document.querySelector("#new-btn");
let resetbtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container-hide");
let msg = document.querySelector("#msg");

// Score elements
let scoreXElement = document.querySelector(".score:nth-child(1) p:nth-child(1)");
let scoreYElement = document.querySelector(".score:nth-child(2) p:nth-child(1)");

let scoreX = 0;  
let scoreY = 0;  

let turn0 = true;
let count = 0;
let gameStopped = false;  // Final game stop if someone gets 3 points

const winPattern = [
    [0,1,2],[0,3,6],[0,4,8],
    [1,4,7],[2,5,8],
    [3,4,5],[6,7,8],[2,4,6]
];

const resetGame = () => {
    if(gameStopped) return; // Agar final winner mil chuka hai toh new game nahi chalega
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(gameStopped) return; // Final stop
        if(turn0){
            box.innerHTML = "o";
            turn0 = false;
        }
        else {
            box.innerHTML = "x";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;      
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Round Winner: ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    // Update score
    if(winner === "o") {
        scoreX++;
        scoreXElement.innerText = scoreX;
    } else if(winner === "x") {
        scoreY++;
        scoreYElement.innerText = scoreY;
    }

    // Check final winner (3 points)
    if(scoreX === 3 || scoreY === 3) {
        gameStopped = true;
        msg.innerText = `🏆 Final Winner: ${winner} (3 Points)`;
        msgContainer.classList.remove("hide");
    }
};

const checkWinner = () => {
    for(let pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGamebtn.addEventListener("click", resetGame);

// Full reset button 
resetbtn.addEventListener("click", () => {
    scoreX = 0;
    scoreY = 0;
    scoreXElement.innerText = scoreX;
    scoreYElement.innerText = scoreY;
    gameStopped = false;
    resetGame();
});
