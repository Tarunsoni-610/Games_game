let userScore = 0;
let compScore = 0;
let gameOver = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const compScorepara = document.querySelector("#comp-score");
const userScorepara = document.querySelector("#user-score");
const restartBtn = document.querySelector("#restart");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const rndmIdx = Math.floor(Math.random() * 3);
    return options[rndmIdx];
};

const gameDraw = () => {
    msg.innerHTML = "Game is draw! Both have same choice";
    msg.style.background = "blue";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorepara.innerHTML = userScore;
        msg.innerHTML = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.background = "green";
        if (userScore === 5) {
            msg.innerHTML = "Congratulations! You win the match!";
    const defaults = {
       spread: 360,
       ticks: 100,
       gravity: 0,
       decay: 0.94,
       startVelocity: 30,
     };

 function shoot() {
   confetti({
     ...defaults,
     particleCount: 30,
     scalar: 1.2,
     shapes: ["circle", "square"],
     colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
   });

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 2,
    shapes: ["emoji"],
    shapeOptions: {
      emoji: {
        value: ["🦄", "🌈"],
      },
    },
  });
}
setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
     gameOver = true;
}
    } 
    else {
        compScore++;
        compScorepara.innerHTML = compScore;
        msg.innerHTML = `You lose! ${compChoice} beats ${userChoice}`;
        msg.style.background = "red";
        if (compScore === 5) {
            msg.innerHTML = "Computer wins the match!";

            gameOver = true;
        }
    }
};

const playGame = (userChoice) => {
    if (gameOver) return;
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        gameDraw();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

restartBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    gameOver = false;
    userScorepara.innerHTML = "0";
    compScorepara.innerHTML = "0";
    msg.innerHTML = "Game restarted!";
    msg.style.background = "";
});