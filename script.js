var counter = 0;
var previousChoice = "";

const rockP = document.getElementById("rock1");
const rockPCount = document.getElementById("rock1Count");
const paperP = document.getElementById("paper1");
const paperPCount = document.getElementById("paper1Count");
const scissorP = document.getElementById("scissors1");
const scissorPCount = document.getElementById("scissors1Count");
const tableLog = document.getElementById("log");
const gameOver = document.getElementById("gameOver");

const inputContainer = document.getElementById("toolNum");

var playerRock;
var playerPaper;
var playerScissor;

var compRock;
var compPaper;
var compScissor;

const playerBox = document.getElementById("choice");
const compBox = document.getElementById("compChoice");
const playerWinner = document.getElementById("playerWin");
const compWinner = document.getElementById("compWin");

const rockPic =
  "url('https://cdn.glitch.global/71df6861-35bb-4af8-99f8-b6aeb8015ea3/rockIMG.png?v=1666109395402')";
const scissorPic =
  "url('https://cdn.glitch.global/71df6861-35bb-4af8-99f8-b6aeb8015ea3/scissorIMG.png?v=1666109395402')";
const paperPic =
  "url('https://cdn.glitch.global/71df6861-35bb-4af8-99f8-b6aeb8015ea3/paperIMG.png?v=1666109395685')";

var hideButton = false;
var playerChoice = "";
var computerChoice = "";

const rockC = document.getElementById("rock2");
const rockCCount = document.getElementById("rock2Count");
const paperC = document.getElementById("paper2");
const paperCCount = document.getElementById("paper2Count");
const scissorC = document.getElementById("scissor2");
const scissorCCount = document.getElementById("scissors2Count");

function displayComputer() {
  rockCCount.innerHTML = "Rock: " + compRock;
  paperCCount.innerHTML = "Paper: " + compPaper;
  scissorCCount.innerHTML = "Scissor: " + compScissor;
};

function displayPlayer() {
  rockPCount.innerHTML = "Rock: " + playerRock;
  paperPCount.innerHTML = "Paper: " + playerPaper;
  scissorPCount.innerHTML = "Scissor: " + playerScissor;
  console.log("done");
};

function setNumbers() {
  let rocks = parseInt(inputContainer.rockNum.value);
  playerRock = rocks;
  compRock = rocks;
  let papers = parseInt(inputContainer.paperNum.value);
  playerPaper = papers;
  compPaper = papers;
  let scissors = parseInt(inputContainer.scissorNum.value)
  playerScissor = scissors;
  compScissor = scissors;
  initialize();
}

function changePlayer(tool) {
  if (!hideButton) {
    if (previousChoice == "") {
      counter++;
    } else if (previousChoice == tool) {
      counter++;
    } else {
      counter = 0;
    }
    compBox.style.backgroundImage = "";
    let text = tool;
    playerWinner.innerHTML = "";
    compWinner.innerHTML = "";
    return text == "rock" && playerRock > 0
      ? ((playerBox.style.backgroundImage = rockPic),
        (hideButton = true),
        (playerChoice = "rock"),
        playerRock--,
        displayPlayer(),
        compTurn())
      : text == "paper" && playerPaper > 0
      ? ((playerBox.style.backgroundImage = paperPic),
        (hideButton = true),
        playerPaper--,
        (playerChoice = "paper"),
        displayPlayer(),
        compTurn())
      : text == "scissor" && playerScissor > 0
      ? ((playerBox.style.backgroundImage = scissorPic),
        (hideButton = true),
        playerScissor--,
        (playerChoice = "scissor"),
        displayPlayer(),
        compTurn())
      : (playerBox.style.backgroundImage = "");
  }
}

function compTurn() {
  let guess = Math.floor(Math.random() * 5);
  console.log(guess);
  if (counter > 2) {
    computerChoice = "";
    if (previousChoice == "rock") {
      alert("Oh no! You broke your rock!");
      rockP.disabled = true;
      rockP.style.opacity = 0.5;
      playerRock = 0;
      addTable("You broke your rock!");
      reset();
      playerBox.style.backgroundImage = "";
      playerWinner.innerHTML = "";
      compWinner.innerHTML = "";
      return;
    }
    if (previousChoice == "paper") {
      alert("Oh no! You broke your paper!");
      paperP.disabled = true;
      paperP.style.opacity = 0.5;
      playerPaper = 0;
      addTable("You broke your paper!");
      reset();
      playerBox.style.backgroundImage = "";
      playerWinner.innerHTML = "";
      compWinner.innerHTML = "";
      return;
    }
    if (previousChoice == "scissor") {
      alert("Oh no! You broke your scissor!");
      scissorP.disabled = true;
      scissorP.style.opacity = 0.5;
      playerScissor = 0;
      addTable("You broke your scissor!");
      reset();
      playerBox.style.backgroundImage = "";
      playerWinner.innerHTML = "";
      compWinner.innerHTML = "";
      return;
    }
  }
  if (guess == 1) {
    return playerChoice == "scissor" && compRock > 0
      ? ((computerChoice = "rock"),
        (compBox.style.backgroundImage = rockPic),
        compRock--,
        displayComputer(),
        decide())
      : playerChoice == "rock" && compPaper > 0
      ? ((computerChoice = "paper"),
        (compBox.style.backgroundImage = paperPic),
        compPaper--,
        displayComputer(),
        decide())
      : playerChoice == "paper" && compScissor > 0
      ? ((computerChoice = "scissor"),
        (compBox.style.backgroundImage = scissorPic),
        compScissor--,
        displayComputer(),
        decide())
      : (compTurn());
  } else {
    let choice = Math.floor(Math.random() * 3);
    console.log(choice);
    return choice == 0 && compRock > 0
      ? ((computerChoice = "rock"),
        (compBox.style.backgroundImage = rockPic),
        compRock--,
        displayComputer(),
        decide())
      : choice == 1 && compPaper > 0
      ? ((computerChoice = "paper"),
        (compBox.style.backgroundImage = paperPic),
        compPaper--,
        displayComputer(),
        decide())
      : choice == 2 && compScissor > 0
      ? ((computerChoice = "scissor"),
        (compBox.style.backgroundImage = scissorPic),
        compScissor--,
        displayComputer(),
        decide())
      : (compTurn());
  }
}

function sleep(miliseconds) {
  var currentTime = new Date().getTime();
  while ((currentTime, miliseconds) => currentTime + miliseconds >= new Date().getTime()) {}
}

function decide() {
  return playerChoice == "rock" && computerChoice == "rock"
    ? share()
    : playerChoice == "paper" && computerChoice == "paper"
    ? share()
    : playerChoice == "scissor" && computerChoice == "scissor"
    ? share()
    : playerChoice == "rock" && computerChoice == "paper"
    ? computerWin(1, 1, 0)
    : playerChoice == "rock" && computerChoice == "scissor"
    ? playerWin(1, 0, 1)
    : playerChoice == "paper" && computerChoice == "rock"
    ? playerWin(1, 1, 0)
    : playerChoice == "paper" && computerChoice == "scissor"
    ? computerWin(0, 1, 1)
    : playerChoice == "scissor" && computerChoice == "rock"
    ? computerWin(1, 0, 1)
    : playerChoice == "scissor" && computerChoice == "paper"
    ? playerWin(0, 1, 1)
    : share();
}

function share() {
  let tool = playerChoice;
  addTable("Tie");
  playerWinner.innerHTML = "";
  compWinner.innerHTML = "";
  playerWinner.innerHTML = "TIE!!";
  compWinner.innerHTML = "TIE!!";
  return tool == "rock"
    ? (playerRock++, compRock++, reset())
    : tool == "paper"
    ? (playerPaper++, compPaper++, reset())
    : tool == "scissor"
    ? (playerScissor++, compScissor++, reset())
    : (tool = "");
}

function playerWin(rockAdd, paperAdd, scissorAdd) {
  addTable("Player");
  playerWinner.innerHTML = "";
  compWinner.innerHTML = "";
  playerWinner.innerHTML = "WINNER";
  playerRock += rockAdd;
  playerPaper += paperAdd;
  playerScissor += scissorAdd;
  reset();
}

function computerWin(rock, paper, scissor) {
  addTable("Computer");
  playerWinner.innerHTML = "";
  compWinner.innerHTML = "";
  compWinner.innerHTML = "WINNER";
  compRock += rock;
  compPaper += paper;
  compScissor += scissor;
  reset();
}

function initialize() { 
  displayPlayer();
  displayComputer();
}

function reset() {
  if (rockP.disabled) {
    playerRock = 0;
  }
  if (paperP.disabled) {
    playerPaper = 0;
  }
  if (scissorP.disabled) {
    playerScissor = 0;
  }
  if (
    rockP.disabled == true &&
    paperP.disabled == true &&
    scissorP.disabled == true
  ) {
    playerRock = 0;
    playerPaper = 0;
    playerScissor = 0;
    hideButton = true;
    alert(
      "Game Over! Unfortunately, the computer won :( Better luck next time. Click reset to play again"
    );
    gameOver.innerHTML =
      "Unfortunately, the computer won :( Better luck next time. Click reset to play again!";
    playerWinner.innerHTML = "";
    compWinner.innerHTML = "";
    playerBox.style.backgroundImage = "";
    compBox.style.backgroundImage = "";
    return;
  }
  initialize();
  
  // playerBox.style.backgroundImage = "";
  // compBox.style.backgroundImage = "";
  previousChoice = playerChoice;
  hideButton = false;
  playerChoice = "";
  computerChoice = "";
  return playerRock == 0 && playerPaper == 0 && playerScissor == 0
    ? ((hideButton = true),
      alert(
        "Game Over! Unfortunately, the computer won :( Better luck next time. Click reset to play again"
      ),
      (gameOver.innerHTML =
        "Unfortunately, the computer won :( Better luck next time. Click reset to play again!"),
      (playerWinner.innerHTML = ""),
      (compWinner.innerHTML = ""),
      (playerBox.style.backgroundImage = ""),
      (compBox.style.backgroundImage = ""))
    : compRock == 0 && compPaper == 0 && compScissor == 0
    ? ((hideButton = true),
      alert("Game Over! Congratulation! You Won :) Click reset to play again"),
      (gameOver.innerHTML =
        "Congratulation! You Won :) Click reset to play again!"),
      (playerWinner.innerHTML = ""),
      (compWinner.innerHTML = ""),
      (playerBox.style.backgroundImage = ""),
      (compBox.style.backgroundImage = ""))
    : console.log("");
  // playerWinner.innerHTML = "";
  // compWinner.innerHTML = "";
}

function addTable(winner) {
  let newRow = tableLog.insertRow();
  let newCell = newRow.insertCell();
  newCell.style.textAlign = "center";
  newCell.style.border = "1px solid";
  newCell.style.width = "498px";
  newCell.innerHTML = playerChoice;
  newCell = newRow.insertCell();
  newCell.style.textAlign = "center";
  newCell.style.border = "1px solid";
  newCell.style.width = "500px";
  newCell.innerHTML = computerChoice;
  newCell = newRow.insertCell();
  newCell.style.textAlign = "center";
  newCell.style.border = "1px solid";
  newCell.style.width = "543px";
  newCell.innerHTML = winner;
};

function clear() {
  console.log("hello");
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

this.onload = () => {
  modal.style.display = "block";
};

span.onclick = () => {
  modal.style.display = "none";
  setNumbers();
  initialize();
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function restart() {
  location.reload();
};