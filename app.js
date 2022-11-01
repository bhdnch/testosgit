const colors = [
  "#DCD0FF",
  "#00BFFF",
  "#ADFF2F",
  "#A52A2A",
  "#FDEAA8",
  "#FF8000",
  "#008000",
  "#FF0000",
];

const startBtn = document.getElementById("start"),
  timeList = document.getElementById("time-list"),
  timeEl = document.getElementById("time"),
  board = document.getElementById("board"),
  screens = document.querySelectorAll(".screen");

const timeInput = document.querySelector(".time-input");
const timeInputBtn = document.querySelector(".time-input-btn");
const parentTimeInput = document.querySelector(".input-li");

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = +event.target.getAttribute("data-time");
    screens[1].classList.add("up");
    startGame();
  }
});

timeInputBtn.addEventListener("click", () => {
  time = +timeInput.value;
  screens[1].classList.add("up");
  startGame();
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  createRandomCircle();
  startTimer(time, timeEl);
}

function startTimer(duration, display) {
  let timer = duration;
  let minutes;
  let seconds;

  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    if (minutes < 10) {
      minutes = "0" + minutes;
    } else {
      minutes = minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    } else {
      seconds = seconds;
    }

    display.innerHTML = minutes + ":" + seconds;

    if (--timer < 0) {
      finishGame();
    }
  }, 1000);
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  circle.style.background = `${getRandomColor()}`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function winTheGame() {
  function kill() {
    const circle = document.querySelector(".circle");

    if (circle) {
      circle.click();
    }
  }

  setInterval(kill, 1);
}

timeInput.addEventListener("focus", () => {
  parentTimeInput.style.border = "2px solid #16d9e3";
});

timeInput.addEventListener("blur", () => {
  parentTimeInput.style.border = "2px solid #c0c0c0";
});
