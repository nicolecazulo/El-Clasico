let barcelonaScore = 0; // Score for Barcelona FC
let realMadridScore = 0; // Score for Real Madrid (always 0)

// Ball object
let ball = {
  x: 400,
  y: 250,
  xSpeed: random(-3, 3),
  ySpeed: random(-3, 3),
  diameter: 15,
};

// Goalkeeper objects
let barcelonaKeeper = { x: 70, y: 250, ySpeed: 2 };
let realMadridKeeper = { x: 730, y: 250, ySpeed: 2 };

// Arrays for player objects
let barcelonaPlayers = [];
let realMadridPlayers = [];

// Player constructor
function Player(x, y, teamColor) {
  this.x = x;
  this.y = y;
  this.teamColor = teamColor;
  this.xSpeed = random(-2, 2);
  this.ySpeed = random(-2, 2);

  this.move = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Bounce back when hitting field boundaries
    if (this.x < 50 || this.x > 750) this.xSpeed *= -1;
    if (this.y < 50 || this.y > 450) this.ySpeed *= -1;
  };

  this.show = function () {
    fill(this.teamColor);
    noStroke();
    ellipse(this.x, this.y, 20);
  };
}

function setup() {
  createCanvas(800, 500);

  // Initialize Barcelona players
  for (let i = 0; i < 5; i++) {
    barcelonaPlayers.push(new Player(random(50, 375), random(50, 450), color(255, 0, 0))); // Red team
  }

  // Initialize Real Madrid players
  for (let i = 0; i < 5; i++) {
    realMadridPlayers.push(new Player(random(425, 750), random(50, 450), color(0, 0, 255))); // Blue team
  }

  // Increment Barcelona's score every second
  setInterval(() => {
    barcelonaScore++;
    updateScore();
  }, 1000);
}

function draw() {
  drawField();

  // Animate players
  for (const player of barcelonaPlayers) {
    player.move();
    player.show();
  }

  for (const player of realMadridPlayers) {
    player.move();
    player.show();
  }

  // Animate goalkeepers
  moveGoalkeeper(barcelonaKeeper, 125, 375);
  moveGoalkeeper(realMadridKeeper, 125, 375);

  // Draw the ball and move it
  moveBall();

  // Check for ball reset (out of bounds)
  if (ball.x < 40 || ball.x > 760 || ball.y < 40 || ball.y > 460) {
    resetBall();
  }
}

// Function to draw the soccer field
function drawField() {
  background(0, 128, 0); // Green field

  // Field outline
  stroke(255);
  strokeWeight(4);
  noFill();
  rect(50, 50, 700, 400);

  // Center circle
  ellipse(400, 250, 100);

  // Midline
  line(400, 50, 400, 450);

  // Goals
  rect(50, 175, 10, 150); // Left goal
  rect(740, 175, 10, 150); // Right goal

  // Penalty areas
  rect(50, 125, 100, 250); // Left penalty area
  rect(650, 125, 100, 250); // Right penalty area
}

// Function to update the score in the HTML
function updateScore() {
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `Barcelona FC: ${barcelonaScore} - Real Madrid: ${realMadridScore}`;
}

// Function to move the ball
function moveBall() {
  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;

  // Bounce ball within boundaries
  if (ball.x < 50 || ball.x > 750) ball.xSpeed *= -1;
  if (ball.y < 50 || ball.y > 450) ball.ySpeed *= -1;

  // Draw the ball
  fill(255, 255, 255);
  noStroke();
  ellipse(ball.x, ball.y, ball.diameter);
}

// Function to reset the ball to the center
function resetBall() {
  ball.x = 400;
  ball.y = 250;
  ball.xSpeed = random(-3, 3);
  ball.ySpeed = random(-3, 3);
}

// Function to move a goalkeeper between a range
function moveGoalkeeper(goalkeeper, minY, maxY) {
  goalkeeper.y += goalkeeper.ySpeed;

  // Reverse direction at bounds
  if (goalkeeper.y < minY || goalkeeper.y > maxY) {
    goalkeeper.ySpeed *= -1;
  }

  // Draw the goalkeeper
  fill(255, 255, 0); // Yellow color for goalkeepers
  rectMode(CENTER);
  rect(goalkeeper.x, goalkeeper.y, 10, 40);
}
