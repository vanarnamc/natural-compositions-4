
var colorCount = 20;
var hueValues =[];
var saturationValues = [];
var brightnessValues = []
let dim;
let cMover;
let ready= false;

var n = 0 // so that the array knows 

//text
let str = 'NARRAGANSETT BEACH PRESS TO BEGIN NARRAGANSETT BEACH PRESS TO BEGIN ';
let rotateSpeed=.006;
let startAngle =    0;     // angle where text should start
let distanceAngle = 360;   // how far (in degrees) text will go

let xspacing = 16; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 75.0; // Height of wave
let period = 500.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

  

let radius;                // set dynamically in setup()
let font;
let sinSpeed1=.006;
var num = 20000;
var noiseScale=500, noiseStrength=1;
var particles = [num];

function preload() {  
  song = loadSound('audio/NB.mp3');
}


function setup() {
createCanvas(windowWidth,windowHeight); 
amp = new p5.Amplitude();
amp.smooth(5000);

dim = width / 2;

 
  noStroke();
  ellipseMode(RADIUS);

  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));

//text
radius = min(width,height) / 3;
 textSize(radius*.15);
 textAlign(CENTER, BASELINE);
 song.setVolume(.6)

  
}

function draw() { 
      cursor(HAND);
      blendMode(BLEND);
     if (ready){
      cursor(ARROW)
      background(192);
      //flash for loop
      let vol = amp.getLevel();
      let mapVol1=map(vol, 0, .02, 0, 1);
      let mapVol2=map(vol, 0, .02, 0, 100);
     // let mapVolS=map(vol, 0, .02, 0, 5);
      let speed = frameCount * 5* mapVol1 % height;
      blendMode(DIFFERENCE);
      print(mapVol1);
      calcWave(mapVol2/4, amplitude);
      renderWave();
      calcWave(mapVol2/4, -amplitude);
      renderWave();
      blendMode(MULTIPLY);
      for(let i=0;i<width;i+=width/(random(3,100))){
        if(mapVol1>.95){ //probability for volume
          fill(0);
      rect(i, random(height), width/3, random(height));}
      }
      let lineSpace=100;
      blendMode(DIFFERENCE);
    for (let  j=0; j<height; j+=lineSpace){
      for (let jj= 0; jj<width; jj+=100){
      stroke(128);
      line(jj-mapVol2, j, jj, j);
      j=j+5;
      }
      // for (let j=0; j<width*.75; j+=20){ //grid ellipse
      //   for (let h=-width; h<height*.75; h+=40){
      //   noStroke();
      //   push();
      //   translate(j,h);
      //   ellipse(j,h + speed,10);
      //   pop();
      //  }
      // }
      cMover=cMover-1;
    }
    for (let  j=lineSpace/4; j<height; j+=lineSpace){
      for (let jj= lineSpace/4; jj<width; jj+=100){
      stroke(128);
    
      line(jj+mapVol2*(noise(frameCount*.02)*10), j, jj, j);
      mapVol2+=1;
      j=j+10;
      }
    }
  
    for (let  j=lineSpace/8; j<height; j+=lineSpace){
      for (let jj= lineSpace/8; jj<width; jj+=100){
      stroke(128);
      strokeWeight(jj*.003);
      line(j+mapVol2*(noise(frameCount*.02)*10), jj, j, jj);
      mapVol2+=1;
      j=j+10;
      }
    }
    let mapVol3=map(vol, 0, .02, 0, 100);
    //vertical
    for (let  j=lineSpace/4; j<height; j+=5){
      for (let jj= lineSpace/4; jj<width; jj+=2){
      stroke(128);
      line(jj+mapVol2*(noise(frameCount*.02)*10), j, jj, j);
      mapVol2+=1;
      j=j+10;
      }
    }
     }
    

    else{ //TEXT DISPLAY
      background(192);
      translate(width/2,height/2);
      rotate(radians(millis()*rotateSpeed));
      textDisplay(1);
    }

} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




function textDisplay(x){
  // calculate the angle between each letter

  rotate(radians(frameCount));
  let angleBetweenLetters = radians(distanceAngle) / str.length;

  scale(sin(frameCount*sinSpeed1)*x);
  // display the text!
  push();
  //translate(width/2, height/2);        // move to circle's center
  rotate(radians(startAngle));         // rotate to where text starts
  for (let i=0; i<str.length; i++) {   // go through each letter in the text
    push();
    rotate(i * angleBetweenLetters);   // rotate to angle
    translate(0,-radius);              // and translate to edge of circle
    fill(0);
    noStroke();
    text(str[i], 0,0);                 // draw character at location
    pop();
  }
  pop();
}

function mousePressed() {
  if (!ready) {
    // initializeAudio();
    ready = true;
    song.loop();

  }
}


function calcWave(v, amplitude) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += 0.01;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude * v;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(112);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    blendMode(NORMAL);
    for(let i=1; i<1000;i+=30){
      fill(0)
    ellipse(x * xspacing, height / 2 + yvalues[x]+i, 2);
    }
  }
}


