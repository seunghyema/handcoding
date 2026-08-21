const startButton = document.querySelector(".start");
const gameScreen = document.querySelector(".game-screen");
const statusBar = document.querySelector(".status-bar");
const startScreen = document.querySelector(".start-screen");
const targetWord = document.querySelector(".target-word");
let currentWord;
let score = 0;
const typingForm = document.querySelector(".typing-form");
const wordInput = document.querySelector(".word-input");
const scoreDisplay = document.querySelector(".score");
const timerDisplay = document.querySelector('.timer');
let timeLeft = 5;
let timerId;

function startGame() {
  score = 0;
  scoreDisplay.textContent = '점수는 ' + score;
  wordInput.value = '';
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  statusBar.classList.remove("hidden");
  currentWord = pickWord();
  targetWord.textContent = currentWord;
  startTimer();
}

startButton.addEventListener("click", startGame);

const words = [
  "banana",
  "fruit",
  "glasses",
  "game",
  "beautiful",
  "earphone",
  "multisue",
  "Ilikeyou",
  "paradise",
];

function pickWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function checkWord(event) {
  event.preventDefault();
  const typedWord = wordInput.value;
  if (typedWord === currentWord) {
    score += 1;
    scoreDisplay.textContent = "점수는 " + score;
    wordInput.value = "";
    currentWord = pickWord();
    targetWord.textContent = currentWord;
    startTimer();
  } else {
    wordInput.value = "";
  }
}

typingForm.addEventListener("submit", checkWord);

function gameOver(){
  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  statusBar.classList.add("hidden");

}

function tick(){
  timeLeft -= 1;
  timerDisplay.textContent = timeLeft;
  if (timeLeft === 0){
    clearInterval(timerId);
    gameOver();
  }

 
}

function startTimer(){

  if(timerId){
    clearInterval(timerId);
  }
  timeLeft = 5;
  timerDisplay.textContent = timeLeft;
  timerId = setInterval(tick,1000);
  
}