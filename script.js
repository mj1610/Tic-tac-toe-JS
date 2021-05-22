const statusDisplay = document.querySelector(".game--status");

let gameActive = true;

let currentPlayer = "X";
let currentPlayerName= "Player1";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => alert(`congratulations! ${currentPlayerName} wins`);

const drawMessage = () => alert(`Draw!`);

const currentPlayerTurn = () => `It's ${currentPlayerName}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;

  clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerName= currentPlayerName==="Player1" ? "Player2" : "Player1"
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  //Check for each winning condition
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];

    let a = gameState[condition[0]];
    let b = gameState[condition[1]];
    let c = gameState[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  //Handle Draw Condition
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // If everything is fine

  //change the state of cell
  //check if somebody won after that click
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  currentPlayerName= "Player1";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
