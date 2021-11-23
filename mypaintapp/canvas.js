// initialize config variables here

// Pencil Points
let ppts = [];
let drawing = false;
let mymouseDown = false;
let strokeColor = "black";
let lineWidth = 5;
let coord = { x: 0, y: 0 };
let lastX,
  lastY = 0;
let lastEvent;
let mouseDown = false;
let restore_array = [];
let index = -1;
let eraser = false;
let startPosition = { x: 0, y: 0 };
let eraser_width = 10;
let erasing = "false";
let pencilCoordinates = { x: 0, y: 0 };
let lineCoordinates = { x: 0, y: 0 };
let textCoordinates = { x: 0, y: 0 };
let pointCoordinates = { x: 0, y: 0 };
let crayonCoordinates = { x: 0, y: 0 };
let rectCoordinates = { x: 0, y: 0 };
let tool = "freehand";
let strokeStyle = "black";
let crpts = [];

let coordWidth = 1;
// setup config variables and start the program
const drawArt=document.querySelector("#sketch-pad");
const canvas = document.querySelector("#my-canvas");
let ctx = canvas.getContext("2d");

//determine the height and the wisth of the canvas
// ctx.canvas.width = window.innerWidth - 60;
// ctx.canvas.height = window.innerHeight - 60;
ctx.canvas.width = drawArt.clientWidth;
ctx.canvas.height = drawArt.clientHeight;
ctx.globalAlpha = 1;
ctx.lineWidth = linebarWidth();
//style of endcaps for a line
ctx.lineCap = "round";
ctx.lineJoin = "round";
// fill the canvas with the specified color
// not sure why it is not working needs to be fixed
ctx.beginPath();
ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
// ctx.fillStyle="#FBF5EF";
// ctx.fill();

//tools eventListener
document.querySelector("#line").addEventListener("click", line);
document.querySelector("#fill").addEventListener("click", fillColor);
document.querySelector("#points").addEventListener("click", drawPoints);
document.querySelector("#pencil").addEventListener("click", pencil);
document.querySelector("#crayon").addEventListener("click", crayon);
document.querySelector("#ellipse").addEventListener("click", ellipse);
document.querySelector("#rectangle").addEventListener("click", rectangle);
document.querySelector("#circle").addEventListener("click", circleTool);
document.querySelector("#eraser").addEventListener("click", eraseImage);
document.querySelector("#clear").addEventListener("click", clearImage);
document.querySelector("#reload").addEventListener("click", reload);
document.querySelector("#save").addEventListener('click', SaveImage) ;
document.querySelector(".downloads").addEventListener("click", DownloadImage)


let dataURL
// wait for the HTML to load
canvas.addEventListener("DOMContentLoaded", init);
function init() {
  // initiating 2D context on it
  ctx.strokeStyle = strokeColor;
  if (tool === "crayon") {
    ctx.lineWidth = 10;
  } else {
    ctx.lineWidth = linebarWidth();
  }
}




///********/
//FREEHANDTOOL//
//************/



  canvas.addEventListener("mousedown", start, false);
  
  canvas.addEventListener("mousemove", draw, false);
  canvas.addEventListener("mouseup", stop, false);
  canvas.addEventListener("touchstart", start, false);
  canvas.addEventListener("touchend", stop, false);
  canvas.addEventListener("touchmove", draw, false);
  canvas.addEventListener("mouseout", stop, false);
  window.addEventListener("resize", resize);
  
  resize();
  
  function resize() {
    ctx.canvas.width = window.innerWidth - 80;
    ctx.canvas.height = window.innerHeight - 80;
  }
  
  function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
  }
  
  function start(event) {
    drawing = true;
    mymouseDown = true;
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("touchmove", draw, false);
    reposition(event);
  }
  
  function stop() {
    drawing = false;
    
    canvas.removeEventListener("mousedown", draw, false);
    canvas.removeEventListener("mousemove", draw, false);
    canvas.removeEventListener("touchmove", draw, false);
  }
  
  function draw(event) {
    if (!drawing) return;
    if (drawing && mymouseDown) {
      //begins or resets a path
      ctx.beginPath();
      //  if (mode!="eraser"){
        //specifies the current line width
        ctx.lineWidth = 5;
        //style of endcaps for a line
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        if (erasing == "true") {
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = "destination-out";
        } else {
          ctx.globalCompositeOperation = "source-over";
        }
        //moves to specified point without creating a line
        ctx.moveTo(coord.x, coord.y);
        reposition(event);
        //adds anew point and creates a line from that point to the last specified point
        ctx.lineTo(coord.x, coord.y);
        //draws the path on to the canvas
        ctx.stroke();
        ctx.closePath();
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
      
      lastX = coord.x;
      lastY = coord.y;
      
      event.preventDefault();
    }
  
  
/************** */
// PENCIL TOOL
/**************** */
function pencil(event) {
  tool = "pencil";
       canvas.removeEventListener("mousemove", draw, false);
       canvas.removeEventListener("mousedown", draw, false);
	let mouse = { x: 0, y: 0};

	//Paint includes line width, line cap, and color
	drawPencil = function() {
		ctx.lineTo(mouse.x, mouse.y);
		ctx.lineWidth = linebarWidth();
		ctx.lineJoin = 'round';
		ctx.strokeStyle = colors;
		ctx.stroke();
	};

	//Find mouse coordinates relative to canvas
	pencilMousemove = function(e){
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	};

	//User clicks down on canvas to trigger draw
	pencilMousedown = function(){
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);
		canvas.addEventListener('mousemove', drawPencil, false);
	};

	//When mouse lifts up, line stops drawing
	pencilMouseup = function(){
		canvas.removeEventListener('mousemove', drawPencil, false);
	};

	//When mouse leaves canvas, line stops drawing
	pencilMouseout = function() {
		canvas.removeEventListener('mousemove', drawPencil, false);
	};

	//Event listeners that will trigger the paint functions when
	//mousedown, mousemove, mouseup, mouseout
	canvas.addEventListener('mousedown', pencilMousedown, false);
	canvas.addEventListener('mousemove', pencilMousemove, false);
	canvas.addEventListener('mouseup', pencilMouseup, false);
	canvas.addEventListener('mouseout', pencilMouseout, false);
  
}

/************** */
// CRAYON TOOL
/**************** */

function crayon(event) {
  tool = "crayon";
  canvas.removeEventListener("mousemove", draw, false);
  canvas.removeEventListener("mousedown", draw, false);

  ctx.globalAlpha = 0.6;
  lineWidth=6;
  let canvasPos = canvas.getBoundingClientRect();

  let dragging = false;
  canvas.addEventListener("mousedown", startCrayon, false);
  canvas.addEventListener("mouseup", stopCrayon, false);
  canvas.addEventListener("mousemove", drawCrayon, false);

  let lastPos = null;

  function startCrayon(event) {
      let pos = getCursorPosition(event);
      dragging = true;
      lastPos = pos;
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
  }
              
  function stopCrayon(event) {
      dragging = false;
      ctx.globalAlpha = 1.0;
      canvas.addEventListener("mousedown",startCrayon,false);
      canvas.addEventListener("mousedown",drawCrayon,false);
      
  }
  
  function drawCrayon(event) {
      var pos, i;
      if (!dragging) {
          return;
      }
      
      pos = getCursorPosition(e);
      if (lastPos) {
          ctx.strokeStyle = 'black';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = linebarWidth();
          // ctx.beginPath();
          // ctx.moveTo(lastPos.x, lastPos.y);
          ctx.lineTo(pos.x, pos.y);
          ctx.stroke();
      }
      
      lastPos = pos;
  }
  
  function getCursorPosition(event) {
      return {
          x: event.clientX - canvasPos.left,
          y: event.clientY - canvasPos.top
      };
  }
  
}

/*********************** */
//Select Points Tool
/********************** */

function drawPoints(event) {
  ctx.globalAlpha = 1.0;
  tool = "points";
  let isstart = false;
  canvas.removeEventListener("mousemove", draw, false);
  canvas.removeEventListener("mousedown", draw, false);
  // let pointSize = linebarWidth();
  let pointSize=6;
  console.log("in");
  canvas.addEventListener("mousedown", drawPointCoord, false);
  canvas.addEventListener("mousemove", drawCoordinates,false)
  canvas.addEventListener("mouseup", stop, false);

  function drawPointCoord(event) {
    getPosition(event);
  }

  function getPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log(x, y);
    drawCoordinates(x, y);
  }

  function drawCoordinates(x, y) {
    ctx.fillStyle = "#00000"; // Red color
    ctx.beginPath();
    ctx.arc(x, y, pointSize / 2, 0, Math.PI * 2, !0);
    ctx.fill();
    ctx.closePath();
  }
  //  ctx.beginPath();
  //  //ctx.moveTo(b.x, b.y);
  //ctx.lineTo(b.x+50, b.y+50);
  //  tmp_ctx.arc(start_mouse.x, start_mouse.y, ctx.lineWidth / 2, 0, Math.PI * 2, !0);
  //  tmp_ctx.fill();
  //  tmp_ctx.closePath();
  //  // copy to real canvas
  //  ctx.drawImage(tmp_canvas, 0, 0);

  function stop() {
    canvas.removeEventListener("mousedown", drawPointCoord, false);
    canvas.removeEventListener("mousemove", drawCoordinates, false);
    canvas.removeEventListener("touchmove", drawCoordinates, false);
  }
}

/******************** */
//Select Line Tool
/****************** */

function line(event) {
  //ClientX -away from the edge of the body/screen to mouse click position
  //Screenx -away from the edge of the entire computer screen
  //offsetX -same as clientx minus the difference of the element/pixels from the start of the element edge/border of the canvas
  canvas.removeEventListener("mousemove", draw, false);
  canvas.removeEventListener("mousedown", draw, false);
  ctx.globalAlpha = 1.0;
  tool = "line";

  
canvas.addEventListener("mousemove", drawLine, false);
canvas.addEventListener("mouseup", endLine, false);
canvas.addEventListener("mouseout", endLine, false);
canvas.addEventListener("mousedown", startLine, false);
canvas.addEventListener("touchstart", startLine, false);
canvas.addEventListener("touchmove", drawLine, false);
canvas.addEventListener("touchend", endLine, false);

let isDown = false;
let beginPoint = null;

// Setting Line Colors
ctx.strokeStyle = 'red';
ctx.lineWidth = 1;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// let startPosition = {x: 0, y: 0};
// let lineCoordinates = {x: 0, y: 0};
// let isDrawStart = false;

// const getClientOffset = (event) => {
//     const {pageX, pageY} = event.touches ? event.touches[0] : event;
//     const x = pageX - canvas.offsetLeft;
//     const y = pageY - canvas.offsetTop;

//     return {
//        x,
//        y
//     } 
// }

function startLine(event){
  isDown = true;
            beginPoint = getPos(event);
  // startPosition = getClientOffset(event);
  // isDrawStart = true;
}

function drawLine(event) {
  if (!isDown) return;
            const endPoint = getPos(event);
            drawJoinLine(beginPoint, endPoint);
            beginPoint = endPoint;
    // if(!isDrawStart) return;
  
  //   lineCoordinates = getClientOffset(event);
  //   // clearCanvas();
  //   ctx.beginPath();
  //   ctx.lineWidth=linebarWidth();
  //  ctx.moveTo(startPosition.x, startPosition.y);
  //  ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
  //  ctx.stroke();
  }

//   const clearCanvas = () => {
//     context.clearRect(0, 0, canvasEle.width, canvasEle.height);
// }


function getPos(event) {
  return {
      x: event.clientX,
      y: event.clientY
  }
}
function drawJoinLine(beginPoint, endPoint) {
  ctx.beginPath();
  ctx.moveTo(beginPoint.x, beginPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.stroke();
  ctx.closePath();
}

 function endLine(event){
  if (!isDown) return;
            
  const endPoint = getPos(event);
  drawJoinLine(beginPoint, endPoint);

  beginPoint = null;
  isDown = false;
  // isDrawStart = false;
    canvas.removeEventListener("mousedown", startLine, false);
    canvas.removeEventListener("mousemove", drawLine, false);
    canvas.removeEventListener("touchmove", drawLine, false);
  }
 

  

}

//**************** */
//SELECT RECTANGLE TOOL

/*****************/

function rectangle(event) {
      console.log("in");
      canvas.removeEventListener("mousemove", draw, false);
      canvas.removeEventListener("mousedown", draw, false);
      ctx.globalAlpha = 1.0;

      var canvasx = canvas.offsetLeft;
      var canvasy = canvas.offsetTop;
      var last_mousex = last_mousey = 0;
      var mousex = mousey = 0;
      var mousedown = false;
      var width;
      var height;
      var drawItems = [];
     
      canvas.addEventListener('mousedown', setRect,false);
      canvas.addEventListener('mouseup', endRect,false);
      canvas.addEventListener('mouseout', endRect,false);
      canvas.addEventListener('mousemove', drawRect,false);
      
       //Mousedown
       function setRect(event) {
          last_mousex = parseInt(event.clientX-canvasx);
          last_mousey = parseInt(event.clientY-canvasy);
          mousedown = true;
      }
      //Mouseup
       function endRect(event) {
          mousedown = false;
          drawItems.push({
             x0: last_mousex,
            x1: width,
            y0: last_mousey,
            y1: height
          });
          canvas.removeEventListener('mousedown', setRect,false);
          canvas.removeEventListener('mouseup', endRect,false);
          canvas.removeEventListener('mouseout', endRect,false);
          canvas.removeEventListener('mousemove', drawRect,false);
          
      }
      //Mousemove
      
       function drawRect(event) {
          mousex = parseInt(event.clientX-canvasx);
         mousey = parseInt(event.clientY-canvasy);
          if(mousedown) {
                 ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
                 ctx.strokeStyle = 'black';
                 ctx.lineWidth = linebarWidth();
                for(var i=0; i<drawItems.length; i++) {
                 ctx.beginPath();
                 ctx.rect(drawItems[i].x0, drawItems[i].y0, drawItems[i].x1, drawItems[i].y1);
                 ctx.stroke();
              }
              width = mousex-last_mousex;
              height = mousey-last_mousey;
              ctx.beginPath();
              ctx.rect(last_mousex,last_mousey,width,height);
              ctx.stroke();
          }
          //Output
         // $('#output').html('current: '+mousex+', '+mousey+'<br/>last: '+last_mousex+', '+last_mousey+'<br/>mousedown: '+mousedown);
      }
  
  // let rectPosition = false;
  // let rectstart ={ x:0, y:0 };
  // canvas.addEventListener("touchstart", startRect, false);
  // canvas.addEventListener("mousedown", startRect, false);
  // canvas.addEventListener("touchmove", drawRect, false);
  // canvas.addEventListener("mousemove", drawRect, false);
  // canvas.addEventListener("mouseup", stopRect, false);
  // canvas.addEventListener("touchend", stopRect, false);
  // canvas.addEventListener("mouseout", stopRect, false);

  // function startRect(event) {
   
    // rectPosition= true;
    // mymouseDown = true;
    //  rectstart.x=event.offsetX;
    //  rectstart.y=event.offsetY;
    // canvas.addEventListener("mousemove", drawRect, false);
    // canvas.addEventListener("touchmove", drawRect, false);
    //  reposition(event);
  // }

  // function drawRect() {
     
    // if (!rectPosition) return;
    // if (rectPosition) {
    //   rectCoordinates.x = event.offsetX;
    //   rectCoordinates.y = event.offsetY;
    //   //canvas is always cleared up before drawing.
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   ctx.beginPath();
    //   ctx.moveTo(rectstart.x, rectstart.y);

    //    let x = Math.min(rectCoordinates.x, rectstart.x);
    //    let y = Math.min(rectCoordinates.y, rectstart.y);
    //    let width = Math.abs(rectCoordinates.x - rectstart.x);
    //    let  height = Math.abs(rectCoordinates.y - rectstart.y);
    //    ctx.strokeRect(x, y, width, height);
    //    ctx.closePath();
    // }
  //  }


}

//**************** */
//CIRCLE TOOL
//*************** */

function circleTool(event) {
  canvas.removeEventListener("mousemove", draw, false);
  canvas.removeEventListener("mousedown", start, false);
  ctx.globalAlpha = 1.0;
  
  var circles = [];
  var markerColor = "#f00";
  var offsetX =canvas.offsetLeft;
   var offsetY = canvas.offsetTop;
  var startX;
  var startY;
  var isMouseDown = false;
  var circle, radius;

 canvas.addEventListener('mousedown', drawCircleMouseDown, false);
 canvas.addEventListener('mouseup', drawCircleMouseUp, false);
 canvas.addEventListener('mousemove', drawCircleMouseMove, false);

 function Circle(startX, startY) {
     this.startX = startX;
     this.startY = startY;
     this.radius;
     this.draw = function() {
     ctx.beginPath();
     ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI);
     ctx.strokeStyle = markerColor;
     ctx.stroke();
    }
 }

 function drawCircleMouseDown(e) {
     startX = parseInt(e.clientX - offsetX);
     startY = parseInt(e.clientY - offsetY);
     isMouseDown = true;
     circle = new Circle(startX, startY);
     circles.push(circle);
   }

 function drawCircleMouseUp() {
   isMouseDown = false;
   circle = null;
   canvas.removeEventListener('mousedown', drawCircleMouseDown, false);
   canvas.removeEventListener('mouseup', drawCircleMouseUp, false);
   canvas.removeEventListener('mousemove', drawCircleMouseMove, false);
 }

 function drawCircleMouseMove(e) {
     if (!isMouseDown) {
         return;
     }
     mouseX = parseInt(e.clientX - offsetX);
     mouseY = parseInt(e.clientY - offsetY);
     circle.radius = getDistance(startX, startY, mouseX, mouseY);
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     circles.forEach(function(circ) {
         circ.draw();
      });
 }

 function getDistance(p1X, p1Y, p2X, p2Y) {
      return Math.sqrt(Math.pow(p1X - p2X, 2) + Math.pow(p1Y - p2Y, 2))
   }
 

}

function ellipse(event) {


  canvas.addEventListener("mousedown", startEllipse, false);
  canvas.addEventListener("mousemove", drawEllipse ,false);
  canvas.addEventListener("mouseup", endEllipse, false);
  canvas.addEventListener("touchstart", startEllipse, false);
  canvas.addEventListener("touchmove", drawEllipse, false);
  canvas.addEventListener("touchend", endEllipse, false);

  var last_mousex = last_mousey = 0;
  var mousex = mousey = 0;
  var mousedown = false;
 
  function startEllipse(event){
    last_mousex = parseInt(event.clientX-canvas.offsetLeft);
    last_mousey = parseInt(event.clientY-canvas.offsetTop);
      mousedown = true;
  }

  function endEllipse(event){
    mousedown = false;
    canvas.removeEventListener("mousedown", startEllipse,false);
    canvas.removeEventListener("mousemove", drawEllipse,false);
    canvas.removeEventListener("mouseup", endEllipse,false);
    canvas.removeEventListener("mouseleave", endEllipse,false);
  }
  function drawEllipse(event){
    mousex = parseInt(event.clientX-canvas.offsetLeft);
    mousey = parseInt(event.clientY-canvas.offsetTop);
      if(mousedown) {
          ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
          //Save
          ctx.save();
          ctx.beginPath();
          //Dynamic scaling
          var scalex = 1*((mousex-last_mousex)/2);
          var scaley = 1*((mousey-last_mousey)/2);
          ctx.scale(scalex,scaley);
          //Create ellipse
          var centerx = (last_mousex/scalex)+1;
          var centery = (last_mousey/scaley)+1;
          ctx.arc(centerx, centery, 1, 0, 2*Math.PI);
          //Restore and draw
          ctx.restore();
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 5;
          ctx.stroke();
      }
  }
}
//**************** */
//SELECT FILL TOOL

/*****************/

function fillColor() {
  // Start a new path to begin drawing in a new color.
  ctx.closePath();
  ctx.beginPath();
  if (strokeStyle === "black" && strokeColor === "black") {
    strokeStyle = "white";
  }
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function textDraw(event) {
  tool = "text";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;

  var x = Math.min(mouse.x, textCoordinates.x);
  var y = Math.min(mouse.y, textCoordinates.y);
  var width = Math.abs(mouse.x - textCoordinates.x);
  var height = Math.abs(mouse.y - textCoordinates.y);

  textarea.style.left = x + "px";
  textarea.style.top = y + "px";
  textarea.style.width = width + "px";
  textarea.style.height = height + "px";

  textarea.style.display = "block";
}

//function to change the strokeSize
function linebarWidth() {
  let widthLine = document.getElementById("myRange").value;
  return widthLine;
}

//Function to erase image
function eraseImage(event) {
  let mouse={x:0,y:0};
  let eraser;
  erasing = "true";
  tool = "eraser";
  mouse.x = e.offsetX ;
  mouse.y =  e.offsetY ;	
  // Tmp canvas is always cleared up before drawing.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var lw = linebarWidth();
  eraser_width=lw+6;
  var ss = ctx.strokeStyle;
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.beginPath();
    ctx.strokeRect(mouse.x, mouse.y, eraser_width, eraser_width);
    ctx.stroke();
    ctx.closePath();
    // restore linewidth
    ctx.lineWidth = lw;
    ctx.strokeStyle = ss;
  

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

function clearImage() {
  tool = "clear";
  // bind event handler to clear button
  ctx.beginPath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}




  function DownloadImage(){
   // Get a reference to the link element 
  var imageFile = document.getElementById("img-file");
  // // // Set that you want to download the image when link is clicked
   imageFile.setAttribute('download', 'image.png');
   //Reference the image in canvas for download
  imageFile.setAttribute('href', canvas.toDataURL());
  }

function SaveImage(){
 
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "image.png";
  link.click();

}

function OpenImage(){

      const reader = new FileReader();
      const img = new Image();
      
      
      const uploadImage = (e) => {
        reader.onload = () => {
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      };
    
    
      const imageLoader = document.getElementById("uploader");
      imageLoader.addEventListener("change", uploadImage);

  // let img = new Image();
  // // Once the image is loaded clear the canvas and draw it
  // img.onload = function(){
  //     ctx.clearRect(0,0,canvas.width, canvas.height);
  //     ctx.drawImage(img,0,0);
  // }
  // img.src = 'image.png';
  
}


function reload(){
  dataURL = canvas.toDataURL();
  var image = new Image();
            image.onload = function () {
                ctx.drawImage(image, 0, 0);
            }
            image.src = dataURL;
}
   


//Color palette
//This collects RGB values in the CSS file so you can assign thm to the strokeStyle()
// document.querySelector('.color-panel').addEventListener('click',changeColors);

// function changeColors(event){
//   const newColor=event.target.id;
//   let asignedNewColorRGB=window.getComputedStyle(document.querySelector(`${newColor}`),null).getPropertyValue('background-color');
//   return ctx.strokeStyle=asignedNewColorRGB;
// }




