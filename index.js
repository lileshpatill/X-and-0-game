const gameInfo = document.querySelector(".container-info");
const Boxes = document.querySelectorAll(".box");
const gameOverBtn = document.querySelector(".btn");

let currentPlayer;
let gameStatus;

const winingOutcome = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function init() {
  currentPlayer = "X";
  gameStatus = ["", "", "", "", "", "", "", "", ""];
  Boxes.forEach((box, index) => {
    box.innerText = "";
    Boxes[index].style.pointerEvents = "all";
    box.classList = `box box${index + 1}`;
  });
  gameOverBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
init();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winingOutcome.forEach((position) => {
    if (
      (gameStatus[position[0]] !== "" ||
        gameStatus[position[1]] !== "" ||
        gameStatus[position[2]] !== "") &&
      gameStatus[position[0]] === gameStatus[position[1]] &&
      gameStatus[position[1]] === gameStatus[position[2]]
    ) {
      if (gameStatus[position[0]] === "X") answer = "X";
      else answer = "0";

      Boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      Boxes[position[0]].classList.add("win");
      Boxes[position[1]].classList.add("win");
      Boxes[position[2]].classList.add("win");
    }
  });
  if (answer !== "") {
    gameInfo.innerText = `Winner is - ${answer}`;
    gameOverBtn.classList.add("active");
  }
  let count = 0;
  gameStatus.forEach((box) => {
    if (box !== "") count++;
  });
  if (count === 9) {
    gameInfo.innerText = "Game Tied";
    gameOverBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameStatus[index] === "") {
    Boxes[index].innerText = currentPlayer;
    gameStatus[index] = currentPlayer;
    Boxes[index].style.pointerEvents = "none";

    swapTurn();

    checkGameOver();
  }
}

Boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

gameOverBtn.addEventListener("click", init);
