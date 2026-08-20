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

function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  statusBar.classList.remove("hidden");
  currentWord = pickWord();
  targetWord.textContent = currentWord;
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
  } else {
    wordInput.value = "";
  }
}

typingForm.addEventListener("submit", checkWord);
