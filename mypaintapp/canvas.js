
// initialize config variables here

// Pencil Points
let ppts = [];
let drawing=false;
let mymouseDown=false;
let strokeColor='black';
let lineWidth=5;
let coord = { x: 0, y: 0 };
let lastX,lastY=0;
let lastEvent;
let mouseDown = false;
let restore_array = [];
let index=-1;
let eraser=false;
let startPosition = {x: 0, y: 0};
let eraser_width=10;
let erasing="false";
let lineCoordinates = {x: 0, y: 0};
let textCoordinates = {x: 0, y: 0};
let pointCoordinates = {x: 0, y: 0};

let strokeStyle='black';
// let tool="freedraw"

let coordWidth=1
// setup config variables and start the program

const canvas = document.querySelector('#my-canvas')
let ctx = canvas.getContext('2d');

//determine the height and the wisth of the canvas
ctx.canvas.width = window.innerWidth-60
ctx.canvas.height = window.innerHeight-60
ctx.globalAlpha=1;

// fill the canvas with the specified color
// not sure why it is not working needs to be fixed
ctx.beginPath();
ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
// ctx.fillStyle="#FBF5EF";
// ctx.fill();


// wait for the HTML to load
document.addEventListener('DOMContentLoaded', init);
document.addEventListener("touchstart", start, false);
document.addEventListener("mousedown", start, false);
document.addEventListener("touchmove", draw, false);
document.addEventListener("mousemove", draw, false);
document.addEventListener("mouseup", stop, false);
document.addEventListener("touchend", stop, false);
document.addEventListener("mouseout", stop, false);
window.addEventListener("resize", resize);

resize();


//tools eventListener
document.querySelector("#line").addEventListener('click', line);
document.querySelector("#fill").addEventListener('click', fillColor);
 document.querySelector("#points").addEventListener('click', drawPoints);
// document.querySelector("#text").addEventListener('click', textDraw);
document.querySelector('#eraser').addEventListener('click', eraseImage);
document.querySelector('#clear').addEventListener('click', clearImage);


function init () { 
    // initiating 2D context on it
       ctx.strokeStyle=strokeColor;
       ctx.lineWidth=linebarWidth();
  }




function resize() {      
  ctx.canvas.width = window.innerWidth-80
  ctx.canvas.height = window.innerHeight-80
 
  }
 
  
function reposition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function start(event) {
    drawing=true;
    mymouseDown=true;
    document.addEventListener("mousemove", draw, false);
    document.addEventListener("touchmove", draw, false);
    reposition(event);
    
 } 
 

function stop() {
    if(drawing){
      ctx.stroke();
      ctx.closePath();
      drawing=false;
   }
     document.removeEventListener("mousemove", draw, false);
}




function draw(event) {
    if (!drawing) return;
    if(drawing && mymouseDown){
     //begins or resets a path
          ctx.beginPath();
    //  if (mode!="eraser"){
            //specifies the current line width
            ctx.lineWidth = linebarWidth();
            //style of endcaps for a line
            ctx.lineCap = "round";
            ctx.lineJoin ="round";
            if(erasing=='true')
              { ctx.globalCompositeOperation="destination-out";}
            else{
                 ctx.globalCompositeOperation="source-over"; 
                 }
            //moves to specified point without creating a line
            ctx.moveTo(coord.x, coord.y);
            reposition(event);
            //adds anew point and creates a line from that point to the last specified point
            ctx.lineTo(coord.x, coord.y);
            //draws the path on to the canvas
            ctx.stroke();
            
            // ctx.font = "16px Arial";
            // // ctx.lineWidth = coordWidth;
            // let gradient = ctx.createLinearGradient(0, 0, c.width, 0);
            // gradient.addColorStop("0", "magenta");
            // gradient.addColorStop("0.5", "blue");
            // gradient.addColorStop("1.0", "red");
            // // Fill with gradient
            // ctx.fillStyle = gradient;
            // ctx.fillText("X: "+coord.x+", Y: "+coord.y, 10, 20,500);
       }
      
     lastX=coord.x;
     lastY=coord.y;
     
     event.preventDefault();
   }
   


function crayon(event){





}


function drawPoints(event){

    tool="points";
    document.removeEventListener("mousemove", draw, false);
    document.removeEventListener("mousedown", draw, false);
    var pointSize = 3;
    let startPosition = {x: 0, y: 0};
    pointCoordinates.x=event.offsetX;
    pointCoordinates.y=event.offsetY;
    console.log(pointCoordinates);
    let isDrawStart = false;

    function getPosition(event){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - canvas.offsetleft;
        var y = event.clientY - canvas.offsettop;
           
        drawCoordinates(x,y);
   }
   
   function drawCoordinates(x,y){	
   
       ctx.fillStyle = "#ff2626"; // Red color
       ctx.beginPath();
       ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
       ctx.fill();
   }
    
 
     const readyDraw = (event) => {
        // startPosition = getPosition(event);
        isDrawStart = true;
     }
     
     const lineDraw = (event) => {
       if(!isDrawStart) return;
        getPosition(event);
       // clearCanvas();
       
     }
     
     const stopDraw = (event) => {
       isDrawStart = false;
     }
     
     const clearCanvas = () => {
        ctx.clearRect(0, 0, canvasEle.width, canvasEle.height);
     }
     
     canvas.addEventListener('mousedown', readyDraw);
     canvas.addEventListener('mousemove', lineDraw);
     canvas.addEventListener('mouseup', stopDraw);
     
     canvas.addEventListener('touchstart',  readyDraw);
     canvas.addEventListener('touchmove',  lineDraw);
     canvas.addEventListener('touchend', stopDraw);
 

}

function line(event){
//ClientX -away from the edge of the body/screen to mouse click position
//Screenx -away from the edge of the entire computer screen
//offsetX -same as clientx minus the difference of the element/pixels from the start of the element edge/border of the canvas
    document.removeEventListener("mousemove", draw, false);
    document.removeEventListener("mousedown", draw, false);
    
     tool="line";
     let startPosition = {x: 0, y: 0};
     lineCoordinates.x=event.offsetX;
     lineCoordinates.y=event.offsetY;
     console.log(lineCoordinates)
     let isDrawStart = false;
    
    const getClientOffset = (event) => {
        const {pageX, pageY} = event.touches ? event.touches[0] : event;
        const x = pageX - canvas.offsetLeft;
        const y = pageY - canvas.offsetTop;
    
        return {
           x,
           y
        } 
    }
    
    const drawLines = () => {
       ctx.beginPath();
       ctx.lineWidth = linebarWidth();
       ctx.lineCap = "round";
       ctx.lineJoin ="round";
       ctx.moveTo(startPosition.x, startPosition.y);
       ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
       ctx.stroke();
    }
    
    const readyDraw = (event) => {
       startPosition = getClientOffset(event);
       isDrawStart = true;
    }
    
    const lineDraw = (event) => {
      if(!isDrawStart) return;
      
      lineCoordinates = getClientOffset(event);
      // clearCanvas();
      drawLines();
    }
    
    const stopDraw = (event) => {
      isDrawStart = false;
    }
    
    const clearCanvas = () => {
       ctx.clearRect(0, 0, canvasEle.width, canvasEle.height);
    }
    
    canvas.addEventListener('mousedown', readyDraw);
    canvas.addEventListener('mousemove', lineDraw);
    canvas.addEventListener('mouseup', stopDraw);
    
    canvas.addEventListener('touchstart',  readyDraw);
    canvas.addEventListener('touchmove',  lineDraw);
    canvas.addEventListener('touchend', stopDraw);

  
//     lineWidth=linebarWidth()
//   //  canvas is always cleared up before drawing.
//     ctx.clearRect(0, 0, canvas.width,canvas.height);
//     ctx.beginPath();
//     ctx.moveTo(startPosition.x, startPosition.y);
   
//     ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
//     ctx.stroke();
//     ctx.closePath();

}

function fillColor(){
// Start a new path to begin drawing in a new color.
ctx.closePath();
ctx.beginPath();
if(strokeStyle==='black' && strokeColor==='black'){
    strokeStyle='white'
}
ctx.fillStyle = ctx.strokeStyle;
ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function textDraw(event){
    tool="text"
	ctx.clearRect(0, 0, canvas.width, canvas.height);
     	mouse.x = event.offsetX 
		mouse.y =  event.offsetY 	

    	var x = Math.min(mouse.x, textCoordinates.x);
    	var y = Math.min(mouse.y, textCoordinates.y);
    	var width = Math.abs(mouse.x - textCoordinates.x);
    	var height = Math.abs(mouse.y - textCoordinates.y);
     
    	textarea.style.left = x + 'px';
    	textarea.style.top = y + 'px';
    	textarea.style.width = width + 'px';
    	textarea.style.height = height + 'px';
     
    	textarea.style.display = 'block';
}

//function to change the strokeSize
function linebarWidth(){
    let widthLine = document.getElementById("myRange").value;
    return widthLine;

}

//Function to erase image 
function eraseImage(event){

    erasing="true"
    tool="eraser"

//mdn code to clear a portion of the canvas
//  ctx.beginPath();
// ctx.fillStyle = '#ff6';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// // Draw blue triangle
// ctx.beginPath();
// ctx.fillStyle = 'blue';
// ctx.moveTo(20, 20);
// ctx.lineTo(180, 20);
// ctx.lineTo(130, 130);
// ctx.closePath();
// ctx.fill();

// // Clear part of the canvas
// ctx.clearRect(10, 10, 120, 100);

}



//Function to clear image 

function clearImage(){
    tool="clear"
    // bind event handler to clear button
     ctx.beginPath();
     ctx.setTransform(1, 0, 0, 1, 0, 0);
     ctx.clearRect(0, 0, canvas.width, canvas.height);
   
  
  }


  //Color palette
// let colors;
// function changeColors(palette) {
// 	switch(palette.id) {
// 		case "red":
// 			colors = "red";
// 			break;
// 		case "red1":
// 			colors = "#F16161";
// 			break;
// 		case "red2":
// 			colors = "#F69FA0";
// 			break;
// 		case "orange":
// 			colors = "orange";
// 			break;
// 		case "orange1":
// 			colors = "#F99F62";
// 			break;
// 		case "orange2":
// 			colors = "#FBB57B";
// 			break;
// 		case "blue":
// 			colors = "#09C2DB";
// 			break;
// 		case "blue1":
// 			colors = "#8BD3DC";
// 			break;
// 		case "blue2":
// 			colors = "#B9E3E8";
// 			break;
// 		case "indigo":
// 			colors = "#0E38AD";
// 			break;
// 		case "indigo1":
// 			colors = "#546AB2";
// 			break;
// 		case "indigo2":
// 			colors = "#9C96C9";
// 			break;
// 		case "green":
// 			colors = "green";
// 			break;
// 		case "green1":
// 			colors = "#97CD7E";
// 			break;
// 		case "green2":
// 			colors = "#C6E2BB";
// 			break;
// 		case "black":
// 			colors = "black";
// 			break;
// 		case "black1":
// 			colors = "#545454";
// 			break;
// 		case "black2":
// 			colors = "#B2B2B2";
// 			break;
// 		case "yellow":
// 			colors = "yellow";
// 			break;
// 		case "yellow1":
// 			colors = "#F7F754";
// 			break;
// 		case "yellow2":
// 			colors ="#F7F4B1";
// 			break;
// 		case "purple":
// 			colors = "#B9509E";
// 			break;
// 		case "purple1":
// 			colors = "#D178B1";
// 			break;
// 		case "purple2":
// 			colors = "#E3ABCE";
// 			break;
// 		case "erase":
// 			colors = "white";
// 			break;
// 	}
// }

