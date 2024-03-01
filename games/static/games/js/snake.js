// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("/static/games/music/food.mp3");
const gameOverSound = new Audio("/static/games/music/gameover.mp3");
const moveSound = new Audio("/static/games/music/move.mp3");
const musicSound = new Audio("/static/games/music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

const questions = [
  "which is the most popular programming langauge",
  'what is the output of (print("hello world")',
  "What is the syntax for a for loop in Python?",
  "How do you declare a variable in JavaScript?",
  "What keyword is used to define a method in Java?",
  "How do you allocate memory dynamically in C++?",
  "What keyword is used to define a class in C#?",
  "How do you define a method in Ruby?",
  "What keyword is used for optional chaining in Swift?",
  "How do you start a session in PHP?",
  "How do you create a hyperlink in HTML?",
  "How do you select all paragraphs in CSS?",
];

const answer = [
  "javascript",
  "hello world",
  "for",
  "var",
  "void",
  "new",
  "class",
  "def",
  "?",
  "session_start();",
  "<a>",
  "p",
];

const wrong = ["new", "class", "def", "?", "session_start();", "<a>", "p"];

food = { x: 6, y: 7 };
wrongAns = { x: 10, y: 4 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake, wrongAns) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  if (snakeArr[0].y === wrongAns.y && snakeArr[0].x === wrongAns.x) {
    return true;
  }

  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr, wrongAns)) {
    saveScore(score, localStorage.getItem("hiscore"));
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };

    let c = 2;
    let d = 16;
    wrongAns = {
      x: Math.round(c + (d - c) * Math.random()),
      y: Math.round(c + (d - c) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food

  let qu = document.querySelector(".questions");
  qu.textContent = `${questions[score]}`;

  //creating food element
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  answerEl = document.createElement("span");
  answerEl.classList.add("answer");
  answerEl.style.gridRowStart = food.y;
  answerEl.style.gridColumnStart = food.x;
  answerEl.textContent = `${answer[score]}`;
  board.appendChild(answerEl);

  // creating wrong element
  wrongElement = document.createElement("div");
  wrongElement.style.gridRowStart = wrongAns.y;
  wrongElement.style.gridColumnStart = wrongAns.x;
  wrongElement.classList.add("food");
  board.appendChild(wrongElement);

  wrongaAnswerEl = document.createElement("span");
  wrongaAnswerEl.classList.add("answer");
  wrongaAnswerEl.style.gridRowStart = wrongAns.y;
  wrongaAnswerEl.style.gridColumnStart = wrongAns.x;
  wrongaAnswerEl.textContent = `${wrong[score]}`;
  board.appendChild(wrongaAnswerEl);
}

// Main logic starts here
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
  inputDir = { x: 0, y: 1 }; // Start the game
    moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});

function saveScore(score, highscore) {
  document.getElementById("score").value = score;
 
  document.getElementById("gameOverForm").submit();
}
