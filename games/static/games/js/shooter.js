"use strict";

const message = document.querySelector(".message");
const restart = document.querySelector(".restart");

// sounds
const backgroundMusic = new Audio("/static/games/sounds/spaceSong.mp3");
const laserShoot = new Audio("/static/games/sounds/laser.ogg");
const explosion = new Audio("/static/games/sounds/explosion.wav");

setTimeout(() => {
  backgroundMusic.play();
}, 5000);

// variable
const gameScreen = document.getElementById("gameScreen");
const ship = document.getElementById("ship");
const laserSpeed = 15;
let meteorSpeed;
if (window.innerWidth < 500) {
  meteorSpeed = 4;
} else {
  meteorSpeed = 2;
}
const laserList = [];
const meteorList = [];
let score = document.querySelector(".score");
let currentScore = 0;
const meteorDirection = [];

let lastAnimationFrameTime = 0;
let fpsInterval = 1000 / 60; // Target frame rate: 60 frames per second
const shooterHighScore = localStorage.getItem("shooterHighScore") || 0;

// all questions
const questions = [
  "which is the famous langauge in the world",
  "Which symbol is used to start a single-line comment in Python?",
  "Which of the following is not a valid variable name in Python?",
  " What is the result of 9 divided by 3 in Python?  ",
  "Which symbol is used for string concatenation in Python?  ",
  "Which keyword is used to define a function in Python?",
  "What is the result of 5 multiplied by 4 in JavaScript?  ",
];

const answers = [
  {
    option1: "js",
    option2: "python",
    option3: "java",
    option4: "css",
    correctoption: "js",
  },
  {
    option1: "//",
    option2: "#",
    option3: "--",
    option4: "'",
    correctoption: "#",
  },
  {
    option1: " my_variable",
    option2: "2nd_number",
    option3: "myVariable",
    option4: "_my_variable",
    correctoption: "2nd_number",
  },
  {
    option1: "3",
    option2: "3.0",
    option3: "4",
    option4: "3.33333335",
    correctoption: "3",
  },
  {
    option1: "+",
    option2: "-",
    option3: "*",
    option4: "/",
    correctoption: "+",
  },
  {
    option1: "func",
    option2: "#function",
    option3: "define",
    option4: "def",
    correctoption: "def",
  },
  {
    option1: "9",
    option2: "20",
    option3: "-54",
    option4: "5*4",
    correctoption: "20",
  },
];

const questionHtml = document.querySelector(".question__area");
questionHtml.textContent = `${questions[currentScore]}`;
// game loop
function gameLoop(currentTime) {
  const deltaTime = currentTime - lastAnimationFrameTime;
  if (deltaTime > fpsInterval) {
    lastAnimationFrameTime = currentTime - (deltaTime % fpsInterval);
    movingLaser();
    movingMeteor();
    checkCollisions();
    checkShipCollision();
    requestAnimationFrame(gameLoop);
  } else {
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);

// moving ship
function movingShip() {
  gameScreen.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX - gameScreen.getBoundingClientRect().left;
    const mouseY = e.clientY - gameScreen.getBoundingClientRect().top;

    const shipX = mouseX - ship.clientWidth / 2;
    const shipY = mouseY - ship.clientHeight / 2;

    if (shipX <= 0) ship.style.left = "0px";
    else if (
      shipX >=
      gameScreen.getBoundingClientRect().right -
        ship.getBoundingClientRect().width
    ) {
      ship.style.left =
        gameScreen.getBoundingClientRect().right -
        ship.getBoundingClientRect().width;
    } else if (
      shipY >=
      gameScreen.getBoundingClientRect().bottom -
        ship.getBoundingClientRect().height
    )
      ship.style.top =
        gameScreen.getBoundingClientRect().bottom -
        ship.getBoundingClientRect().height;
    else if (shipY <= 0) ship.style.top = "0px";
    else {
      ship.style.left = shipX + "px";
      ship.style.top = shipY + "px";
    }
  });
}

// calling all functin
movingShip();

// creatingLaser
ship.addEventListener("click", e => {
  const laser = document.createElement("div");
  laser.classList.add("laser");
  const shipRect = ship.getBoundingClientRect();
  const gameScreenRect = gameScreen.getBoundingClientRect();
  laserShoot.play();

  // Position the laser at the top center of the ship
  const laserX =
    shipRect.left - gameScreenRect.left + ship.clientWidth / 2 - 6.5; // Adjust the value for alignment
  const laserY = shipRect.top - gameScreenRect.top;
  laser.style.left = laserX + "px";
  laser.style.top = laserY - 54 + "px";
  laserList.unshift(laser);
});

// movingLaser
function movingLaser() {
  laserList.forEach(laser => {
    gameScreen.insertAdjacentElement("beforeend", laser);
    // You can add any additional logic for updating the lasers here if needed
    const laserRect = laser.getBoundingClientRect();
    const laserY = laserRect.top - gameScreen.getBoundingClientRect().top;

    // Move the laser upwards by 10 pixels per frame (adjust as needed)
    const newLaserY = laserY - laserSpeed;
    laser.style.top = newLaserY + "px";

    // Remove the laser if it goes out of the game screen
    if (newLaserY < -10) {
      gameScreen.removeChild(laser);
      laserList.splice(laserList.indexOf(laser), 1);
    }
  });
}

// gameScreen.getBoundingClientRect().right - meteor.getBoundingClientRect().width;

// creating meteor
function createMeteor(pos, content) {
  const meteor = document.createElement("div");
  meteor.classList.add("meteor");
  meteor.classList.add("rotation");
  const meteorX = pos;

  const question = document.createElement("span");
  question.classList.add("question");
  question.innerText = content;

  let meteorShape = Math.random() * (1 - 0.5) + 0.5;
  meteor.style.width = (101 * meteorShape) / 10 + "rem";
  meteor.style.height = (84 * meteorShape) / 10 + "rem";

  let meteorXDir = (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5;
  meteorDirection.push(meteorXDir);

  const meteorY = Math.trunc(Math.random() * 1) + 50;
  // meteor.style.transform = `rotate(${meteorX})`;
  meteor.style.left = meteorX + "vw";

  meteor.style.top = gameScreen.getBoundingClientRect().top - meteorY + "px";
  meteor.appendChild(question);
  meteorList.unshift(meteor);
}

// movingMeteor
function movingMeteor() {
  meteorList.forEach((meteor, i) => {
    gameScreen.insertAdjacentElement("afterbegin", meteor);
    meteor.style.left = Number.parseFloat(meteor.style.left) + "px";
    meteor.style.top = Number.parseFloat(meteor.style.top) + meteorSpeed + "px";

    if (
      meteor.getBoundingClientRect().top >
      gameScreen.getBoundingClientRect().bottom
    ) {
      gameScreen.removeChild(meteor);
      meteorList.splice(meteorList.indexOf(meteor), 1);
      meteorDirection.splice(i, 1);
    }
  });
}

// creating meteor after each 1s
setInterval(() => {
  createMeteor(200, answers[currentScore].option1);
  createMeteor(600, answers[currentScore].option2);
  createMeteor(900, answers[currentScore].option3);
  createMeteor(1300, answers[currentScore].option4);
}, 5000);

// checking Collision
function checkCollisions() {
  laserList.forEach(laser => {
    const laserRect = laser.getBoundingClientRect();

    // Check for collisions with asteroids
    meteorList.forEach((meteor, i) => {
      const meteorRect = meteor.getBoundingClientRect();

      if (
        laserRect.right >= meteorRect.left &&
        laserRect.left <= meteorRect.right &&
        laserRect.bottom >= meteorRect.top &&
        laserRect.top + 27 <= meteorRect.bottom &&
        meteor.textContent == answers[currentScore].correctoption
      ) {
        gameScreen.removeChild(laser);
        meteorList.forEach((meteordelete, i) => {
          gameScreen.removeChild(meteordelete);
        });

        laserList.splice(laserList.indexOf(laser), 1);
        meteorList.splice(0, 4);
        meteorDirection.splice(0, 4);
        currentScore++;
        if (currentScore > shooterHighScore) {
          localStorage.setItem("shooterHighScore", currentScore);
        }

        score.textContent = `score : ${currentScore}`;
        explosion.play();
        questionHtml.textContent = `${questions[currentScore]}`;
      }
    });
  });
}

// Function to check collision between ship and asteroids
function checkShipCollision() {
  const shipRect = ship.getBoundingClientRect();

  meteorList.forEach(meteor => {
    const meteorRect = meteor.getBoundingClientRect();

    if (
      shipRect.right - 15 >= meteorRect.left &&
      shipRect.left + 20 <= meteorRect.right &&
      shipRect.bottom - 20 >= meteorRect.top &&
      shipRect.top + 30 <= meteorRect.bottom
    ) {
      // Collision detected between ship and meteor
      saveScore(currentScore);
      message.style.display = "flex";
      ship.style.display = "none";
      explosion.play();
    }
  });
}

restart.addEventListener("click", restartGame);
function restartGame() {
  location.reload();
}

//sending data
function saveScore(score) {
  document.getElementById("score").value = currentScore;
  document.getElementById("gameOverForm").submit();
}
