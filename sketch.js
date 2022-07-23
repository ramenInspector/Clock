let darkToggle = true;
let bgCol = 20;
let clicked = false;

let secTick;
let minTick;
let hourTick;

let curMin, prevMin;

let curHour, prevHour;

let curSec, prevSec;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noFill();
  textFont("Roboto Mono");
  curSec = second();
}

function preload() {
  secTick = loadSound("clocktick.wav");
  minTick = loadSound("beep.mp3");
  hourTick = loadSound("bell.wav");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(bgCol);
  translate(width / 2, height / 2);
  rotate(-90);
  if (darkToggle) {
    bgCol = 20;
  } else if (!darkToggle) {
    bgCol = 200;
  }

  if (clicked) {
    if (darkToggle) {
      darkToggle = false;
    } else {
      darkToggle = true;
    }
  }

  if (prevSec != curSec && frameCount > 30) {
    secTick.play();
  }
  if (prevMin != curMin && frameCount > 30) {
    minTick.play();
  }
  if (prevHour != curHour && frameCount > 30) {
    hourTick.play();
  }

  prevMin = curMin;
  curMin = minute();

  prevHour = curHour;
  curHour = hour();

  prevSec = curSec;
  curSec = second();

  let sec = second();
  let min = minute();
  let hr = hour();

  let secAngle = map(sec, 0, 60, 0, 360);
  let minAngle = map(min, 0, 60, 0, 360);
  let hrAngle = map(hr, 0, 12, 0, 360);

  let secO = "";
  let minO = "";

  noFill();

  //second

  stroke(100, 255, 150);
  strokeWeight(4);

  arc(0, 0, 250, 250, 0, secAngle);

  push();
  rotate(secAngle);
  line(0, 0, 75, 0);
  pop();

  //minute

  stroke(100, 150, 255);
  strokeWeight(4);

  arc(0, 0, 300, 300, 0, minAngle);

  push();
  rotate(minAngle);
  line(0, 0, 100, 0);
  pop();

  //hour

  stroke(255, 150, 100);
  strokeWeight(4);

  arc(0, 0, 350, 350, 0, hrAngle);

  push();
  rotate(hrAngle);
  line(0, 0, 50, 0);
  pop();

  //middle point

  stroke(255);
  strokeWeight(10);
  point(0, 0);

  // //clock border
  // if (darkToggle) {
  //   stroke(bgCol + 75);
  // } else {
  //   stroke(bgCol - 75);
  // }
  stroke(100);
  strokeWeight(10);
  circle(0, 0, 400);

  //text time
  push();
  translate(0, 0);
  rotate(90);
  fill(75);
  noStroke();
  textAlign(CENTER);
  textSize(30);
  if (sec < 10) {
    secO = "0";
  } else {
    secO = "";
  }
  if (min < 10) {
    minO = "0";
  } else {
    minO = "";
  }
  text(hr + ":" + minO + min + ":" + secO + sec, -4, 250);
  pop();

  //clicked set to false

  clicked = false;
}

function mouseClicked() {
  clicked = true;
}
