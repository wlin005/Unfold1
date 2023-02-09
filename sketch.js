//Unfold， 04/12/2023， Wei Lin
//Select bule or dark coulor objects with mouse in the camera, you will find something.

//code adapted from here:
//Jeff Thompson https://www.youtube.com/watch?v=hFJZNlq6UJc&t=301s 
//Joe https://editor.p5js.org/joemcalister/sketches/6v-N3urTT

//inspirations  NAKED BIG BOOK 2022 SPRING EDIT https://naked.co.jp/works/13306/

let capture; //create cam

//create image
let images;
let imageIndex = 0;

//leaf
let range = 2.5; //range of leaf


//preload image to array
function preload(){
  images = [
    loadImage('assets/1.0.png'), 
    loadImage('assets/1.1.png'), 
    loadImage('assets/1.2.png'),
    loadImage('assets/1.3.png'), 
    loadImage('assets/1.4.png'), 
    loadImage('assets/1.5.png'), 
    loadImage('assets/1.6.png'), 
    loadImage('assets/1.7.png'),
  ]
}

//play the image sequences
function moveFrame() {
  imageIndex++;
  if( imageIndex > images.length - 1) {
    imageIndex = 0;
  }
}

//calculate value of color
function colorDistance(first, second) {
  let r = abs(red(first) - red (second));
  let g = abs(green(first) - green (second));
  let b = abs(blue(first) - blue (second));

  return r + g + b;
}

// a 'wrapper' function that makes a single, random tree
function drawTree(){
  let bLen = random(120,500);
  let bAng = -PI*0.5;

  push();
  translate(random(width), height);
  branch(bLen, bAng); // initial length and facing up
  pop();
}

// same recusive function as in Tree.pde, only using random numbers
function branch(len, theta){
  push();
  rotate(theta); // rotate to the angle provided
  strokeWeight(sqrt(len)*0.5);
  line(0,0, len, 0); // draw one branch
  translate(len,0); // and move to its edge
  
    if(len > 5.0){ // stop condition - very important!
      let newAng = random(PI*0.15); // create new angle
      let newLen = len * random(0.4,1.0); // create new length
      branch(len * random(0.4,0.8), - newAng); // left branch
      branch(len * random(0.4,0.8), newAng);   // right branch
    }else{

     // leaf  
     // Jeff Thompson https://www.youtube.com/watch?v=hFJZNlq6UJc&t=301s
      let x = 0;
      let y = 0;
      stroke(255,104,38,random(255));
      //stroke(77,54,112,random(255));
      noFill();
      
      beginShape();
      for(let i=0; i < 200; i++){
        vertex(x, y);
        x += random(-range, range);
        y += random(-range, range);
      }
      endShape();
   }
   pop();
  }
 
// Joe https://editor.p5js.org/joemcalister/sketches/6v-N3urTT
// fog is a slightly opaque rectangle over the entire window
function drawFog(){
  push();
  fill(255, 16);
  noStroke();
  rect(0,0,width,height);
  pop();
}


function setup() {
  createCanvas(2560,1440); 
  frameRate(2);

  //forest
  background(255);
  stroke(77,54,112,random(255));
  
  //cam
  capture = createCapture(VIDEO);
  capture.size(320,240);
  capture.hide();
 }

 function draw() {
  //cam
  image(capture, 0, 0, 320,240);
  let c = get(mouseX, mouseY); //read the color according to position of mouse
  //key
  push();
  translate(50,10);
  fill(c);
  noStroke();
  rect(15.5,30, 15, 70);
  rect(15.5,55, 30, 7);
  rect(15.5,70, 30, 7);
  circle(25,25,40);
  pop();

  //estimate color with setting point 
  let distanceToBlue = colorDistance(c, color(0,0,255));
  let distanceToRed = colorDistance(c, color(255,0,0));
 
  //stimulate interactive condition  
    if ((distanceToBlue < 300) & (distanceToBlue < distanceToRed)){
      image( images[imageIndex], 0,0, width, height);//play image sequences
      moveFrame();
    }else{drawTree();
     if(frameCount % 1 == 0)drawFog(); //  draw how many trees evey time
    }
}






