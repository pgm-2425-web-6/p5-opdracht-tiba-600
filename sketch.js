let circles = [];
let sounds = [];
let currentSound = null; 

function mousePressed() {
  getAudioContext().resume();
}

function preload() {
  sounds.push(loadSound('sounds/click1.mp3'));
  sounds.push(loadSound('sounds/click2.mp3'));
  sounds.push(loadSound('sounds/click3.mp3'));
  sounds.push(loadSound('sounds/click4.mp3'));
  sounds.push(loadSound('sounds/click5.mp3'));
}

function setup() {
  const canvas = createCanvas(windowWidth * 0.9, (windowWidth * 0.9) * 9 / 16);
  canvas.parent('canvas-container');
  for (let i = 0; i < 10; i++) {
    circles.push(new Circle(random(width), random(height), color(255, 204, 0)));
  }
}

function draw() {
  background(245, 245, 220); 
  stroke(0); 
  strokeWeight(4); 
  noFill();
  rect(0, 0, width, height);

  for (let circle of circles) {
    circle.move();
    circle.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth * 0.9, (windowWidth * 0.9) * 9 / 16);
}

function mousePressed() {
  let clickedOnCircle = false;

  for (let circle of circles) {
    if (circle.isHovered()) {
      if (currentSound) {
        currentSound.stop(); 
      }
      circle.changeColor();
      playRandomSound(); 
      currentSound = sounds[sounds.indexOf(currentSound)]; 
      clickedOnCircle = true;
      break;
    }
  }

  if (!clickedOnCircle) {
    circles.push(new Circle(mouseX, mouseY, color(204, 153, 0)));
  }
}

function playRandomSound() {
  let randomIndex = floor(random(sounds.length));
  currentSound = sounds[randomIndex];
  currentSound.play();
}

class Circle {
  constructor(x, y, initialColor) {
    this.x = x;
    this.y = y;
    this.size = random(20, 50);
    this.color = initialColor;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  display() {
    fill(this.color);
    noStroke();
    stroke(0);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size);
  }

  isHovered() {
    return dist(mouseX, mouseY, this.x, this.y) < this.size / 2;
  }

  changeColor() {
    this.color = color(random(255), random(255), random(255));
  }
}

