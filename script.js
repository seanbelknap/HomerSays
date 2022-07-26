let sequence = [];
let playerSequence = [];
let flash;
let turn;
let good = true;
let simonTurn;
let win = true;
let intervalId;
let noise = true;

const turnCounter = document.querySelector("#turn");
const green = document.querySelector("#green");
const blue = document.querySelector("#blue");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener('click', start);
function start (){
  console.log("Game Started");
  play();
  startBtn.value = "Stop";
  startBtn.removeEventListener('click', start);
  startBtn.addEventListener("click", stop);
}

function stop(){
    console.log('Game Stopped');
    win = false;
    sequence = [];
    playerSequence = [];
    intervalId = 0;
    flash = 0;
    turn = 0;
    turnCounter.innerHTML = 0;
    startBtn.value = "Start";
    startBtn.removeEventListener('click', stop);
    startBtn.addEventListener("click", start);
  };

function play() {
  win = false;
  sequence = [];
  playerSequence = [];
  intervalId = 0;
  flash = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 1000; i++) {
    sequence.push(Math.floor(Math.random() * 4) + 1);
  }
  //   console.log(sequence);
  simonTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  document.body.style.pointerEvents = "none";
  if (flash == turn) {
    clearInterval(intervalId);
    simonTurn = false;
    clearColor();
    document.body.style.pointerEvents = "auto";
  }

  if (simonTurn) {
    clearColor();
    setTimeout(function () {
      if (sequence[flash] == 1) one();
      if (sequence[flash] == 2) two();
      if (sequence[flash] == 3) three();
      if (sequence[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  green.style.backgroundColor = "lightgreen";
}
function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  blue.style.backgroundColor = "lightblue";
}
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  red.style.backgroundColor = "tomato";
}
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  yellow.style.backgroundColor = "lightyellow";
}

function clearColor() {
  green.style.backgroundColor = "green";
  blue.style.backgroundColor = "blue";
  red.style.backgroundColor = "red";
  yellow.style.backgroundColor = "yellow";
}
function flashColor() {
  green.style.backgroundColor = "lightgreen";
  blue.style.backgroundColor = "lightblue";
  red.style.backgroundColor = "tomato";
  yellow.style.backgroundColor = "lightyellow";
}

green.addEventListener("click", function () {
  one();
  if (good) {
    playerSequence.push(1);
    check();
    one();
  }
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

blue.addEventListener("click", function () {
  two();
  if (good) {
    playerSequence.push(2);
    check();
  }
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

red.addEventListener("click", function () {
  three();
  if (good) {
    playerSequence.push(3);
    check();
  }
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

yellow.addEventListener("click", function () {
  four();
  if (good) {
    playerSequence.push(4);
    check();
  }
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

function check() {
  if (
    playerSequence[playerSequence.length - 1] !==
    sequence[playerSequence.length - 1]
  )
    good = false;
  if (playerSequence.length == 1000 && good == true) {
    winGame();
  }
  if (good == false) {
    flashColor();
    stop();
    noise = false;
    alert("Oops! Wanna play again?")
    console.log("Loser");
  }

  if (turn == playerSequence.length && good && !win) {
    turn++;
    playerSequence = [];
    simonTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  document.body.style.pointerEvents = "none";
  win = true;
  console.log("Winner");
  alert("Congrats, you won!")
}
