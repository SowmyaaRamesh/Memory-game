const cards = document.querySelectorAll(".card");
const button = document.getElementById("level-btn");
const timer = document.getElementById("timer");

startTime = 80;

let hasFlipped = false;
let firstCard, secondCard;
let lock = false;
let Score = 0;
let Level = 1;
let won = false;

let level = document.getElementById("level");
let score = document.getElementById("score");
let result = document.getElementById("result");

function flipCard() {
  if (lock) {
    return;
  }
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = this;
  } else {
    hasFlipped = false;
    secondCard = this;
    // console.log(firstCard, secondCard);

    //check if first and second card match
    isMatch();
  }
}

function isMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    Score += 1;
    score.innerHTML = Score;
    resetBoard();
  } else {
    lock = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  hasFlipped = false;
  lock = false;
  firstCard = null;
  secondCard = null;
  if (Score == 6) {
    clearInterval(t);
    won = true;
    result.innerHTML = "You have Won!";
  }
}

function restartLevel() {
  clearInterval(t);
  hasFlipped = false;
  lock = false;
  firstCard = null;
  secondCard = null;
  won = false;
  Score = 0;
  score.innerHTML = Score;
  level.innerHTML = Level;
  result.innerHTML = "Time Over! Retry";
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
    card.classList.remove("flip");
  });
  shuffle();
  countDown();
}

function countDown() {
  timeLeft = startTime;
  t = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval((timeLeft = 0));
      if (won == false) {
        restartLevel();
      }
    }
    timer.innerHTML = timeLeft;
    timeLeft -= 1;
  }, 1000);
}

function shuffle() {
  cards.forEach((card) => {
    let randomNum = Math.floor(Math.random() * 12);
    card.style.order = randomNum;
  });
}

function levelUp() {
  if (Score != 6) {
    result.innerHTML = "Finish current Level";
    return;
  }
  won = false;
  Score = 0;
  Level += 1;
  score.innerHTML = Score;
  level.innerHTML = Level;
  result.innerHTML = "";
  startTime -= 10;
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
    card.classList.remove("flip");
  });
  shuffle();
  countDown();
}

cards.forEach((card) => card.addEventListener("click", flipCard));
button.addEventListener("click", levelUp);
