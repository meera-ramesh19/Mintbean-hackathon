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
ctx.canvas.width = window.innerWidth - 60;
ctx.canvas.height = window.innerHeight - 60;
// ctx.canvas.width = drawArt.clientWidth;
// ctx.canvas.height = drawArt.clientHeight;
ctx.globalAlpha = 1.0;
ctx.lineWidth = linebarWidth();
//style of endcaps for a line
ctx.lineCap = "round";
ctx.lineJoin = "round";
// fill the canvas with the specified color

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
//document.querySelector("#reload").addEventListener("click", reload);
document.querySelector("#save").addEventListener('click', SaveImage) ;
document.querySelector(".downloads").addEventListener("click", DownloadImage);


let dataURL
// wait for the HTML to load
canvas.addEventListener("DOMContentLoaded", init);
function init() {
  // initiating 2D context on it
  ctx.strokeStyle = strokeColor;
  if (tool === "crayon") {
    ctx.lineWidth = 6;
  } else {
    ctx.lineWidth = linebarWidth();
  }
}


//function to change the strokeSize
function linebarWidth() {
  let widthLine = document.getElementById("myRange").value;
  return widthLine;
}


let colors;
function changeColors(palette) {
	switch(palette.id) {
		case "red":
			colors = "red";
			break;
		case "red1":
			colors = "#F16161";
			break;
		case "red2":
			colors = "#F69FA0";
			break;
		case "orange":
			colors = "orange";
			break;
		case "orange1":
			colors = "#F99F62";
			break;
		case "orange2":
			colors = "#FBB57B";
			break;
		case "blue":
			colors = "#09C2DB";
			break;
		case "blue1":
			colors = "#8BD3DC";
			break;
		case "blue2":
			colors = "#B9E3E8";
			break;
		case "indigo":
			colors = "#0E38AD";
			break;
		case "indigo1":
			colors = "#546AB2";
			break;
		case "indigo2":
			colors = "#9C96C9";
			break;
		case "green":
			colors = "green";
			break;
		case "green1":
			colors = "#97CD7E";
			break;
		case "green2":
			colors = "#C6E2BB";
			break;
		case "black":
			colors = "black";
			break;
		case "black1":
			colors = "#545454";
			break;
		case "black2":
			colors = "#B2B2B2";
			break;
		case "yellow":
			colors = "yellow";
			break;
		case "yellow1":
			colors = "#F7F754";
			break;
		case "yellow2":
			colors ="#F7F4B1";
			break;
		case "purple":
			colors = "#B9509E";
			break;
		case "purple1":
			colors = "#D178B1";
			break;
		case "purple2":
			colors = "#E3ABCE";
			break;
		case "erase":
			colors = "white";
			break;
	}
};

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
  

 

//This collects the RGB values in the CSS file so you can assign them to the strokeStyle()
// const changeColors = (event) => {
//   const newColor = event.target.id;
//   console.log(newColor)
//   let assignedNewColorRGB = window.getComputedStyle(document.querySelector(`#${newColor}`), null).getPropertyValue('background-color');
//   return  ctx.storkeStyle=assignedNewColorRGB;
// }
// document.querySelector('.color-panel').addEventListener('click', changeColors)





  function draw(event) {
    if (!drawing) return;
    if (drawing && mymouseDown) {
      //begins or resets a path
        ctx.beginPath();
      //  if (mode!="eraser"){
        //specifies the current line width
        ctx.lineWidth = linebarWidth();
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
        // if (event.type==='touchmove'){
        ctx.moveTo(coord.x, coord.y);
        reposition(event);
        ctx.strokeStyle=colors;
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
  
  // }





/************** */
// PENCIL TOOL
/**************** */
function pencil(event) {
  tool = "pencil";
       canvas.removeEventListener("mousemove", draw, false);
       canvas.removeEventListener("mousedown", draw, false);
	let mouse = { x: 0, y: 0};

	//Paint includes line width, line cap, and color
	drawPencil = function(event) {
    ctx.lineWidth = linebarWidth();
		ctx.lineJoin = 'round';
		ctx.strokeStyle = colors;
		ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
	};

	//Find mouse coordinates relative to canvas
	pencilMousemove = function(event){
		mouse.x = event.pageX - this.offsetLeft;
		mouse.y = event.pageY - this.offsetTop;
	};

	//User clicks down on canvas to trigger draw
	pencilMousedown = function(event){
    
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
	canvas.addEventListener('mouseout', pencilMouseup, false);
  canvas.addEventListener("touchstart", pencilMousedown, false);
  canvas.addEventListener("touchend", pencilMouseup, false);
  canvas.addEventListener("touchmove", pencilMousemove, false);
  
}

/************** */
// CRAYON TOOL
/**************** */

function crayon(event) {
  tool = "crayon";
  canvas.removeEventListener("mousemove", draw, false);
  canvas.removeEventListener("mousedown", draw, false);

  ctx.globalAlpha = 0.4;
  lineWidth=6;
  let canvasPos = canvas.getBoundingClientRect();

  let dragging = false;
  canvas.addEventListener("mousedown", startCrayon, false);
  canvas.addEventListener("mouseup", stopCrayon, false);
  canvas.addEventListener("mousemove", drawCrayon, false);
  canvas.addEventListener("touchstart", startCrayon, false);
  canvas.addEventListener("touchend", stopCrayon, false);
  canvas.addEventListener("touchmove", drawCrayon, false);
  

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
      // ctx.lineWidth=linebarWidth();
      canvas.addEventListener("mousedown",startCrayon,false);
      canvas.addEventListener("mousedown",drawCrayon,false);
      
  }
  
  function drawCrayon(event) {
      var pos, i;
      if (!dragging) {
          return;
      }
      if (erasing == "true") {
        ctx.globalCompositeOperation = "destination-out";
      } else {
        ctx.globalCompositeOperation = "source-over";
      }      pos = getCursorPosition(event);
      if (lastPos) {
          ctx.strokeStyle = 'black';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          // ctx.lineWidth=lineWidth;
            ctx.lineWidth = linebarWidth();
          ctx.strokeStyle= colors;
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
  //  let pointSize = linebarWidth();
  let pointSize=6;
 
  console.log("in");
  canvas.addEventListener("mousedown", drawPointCoord, false);
  canvas.addEventListener("mousemove", drawCoordinates,false)
  canvas.addEventListener("mouseup", stop, false);
  canvas.addEventListener("touchstart", drawPointCoord, false);
  canvas.addEventListener("touchend", stop, false);
  canvas.addEventListener("touchmove",drawCoordinates, false);
  

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
     ctx.strokeStyle=colors;
    ctx.fillStyle = ctx.strokeStyle; // Red color
    ctx.beginPath();
    ctx.arc(x, y, pointSize / 2, 0, Math.PI * 2, !0);
    ctx.fill();
    ctx.closePath();
  }
  

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
  //PageX-the mouse coordinates from the body to mouse click position
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

let isDrawing = false;
let x = 0;
let y = 0;

// Setting Line Colors
ctx.strokeStyle = colors;
ctx.lineWidth = linebarWidth();
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

  // startPosition = getClientOffset(event);
  // isDrawStart = true;
  x = event.offsetX;
  y = event.offsetY;
  isDrawing = true;
}

function drawLine(event) {
  if (isDrawing === true) {
    drawJoinLine(ctx, x, y, event.offsetX, event.offsetY);
    x = event.offsetX;
    y = event.offsetY;
 }


    // if(!isDrawStart) return;
  
  //   lineCoordinates = getClientOffset(event);
  //   // clearCanvas();
  //   ctx.beginPath();
  //   ctx.lineWidth=linebarWidth();
  //  ctx.moveTo(startPosition.x, startPosition.y);
  //  ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
  //  ctx.stroke();
  }

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasEle.width, canvasEle.height);
}


function getPos(event) {
  return {
      x: event.clientX,
      y: event.clientY
  }
}
function drawJoinLine(ctx,x1,y1,x2,y2) {
  ctx.beginPath();
   ctx.strokeStyle = colors;
   ctx.lineWidth = linebarWidth();
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.stroke();
   ctx.closePath();
}

 function endLine(event){
  
  if (isDrawing === true) {
    drawLine(ctx, x, y, event.offsetX, event.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
   }
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

      let  canvasx = canvas.offsetLeft;
      let canvasy = canvas.offsetTop;
      let last_mousex ,last_mousey = 0;
      let mousex , mousey = 0;
      let mousedown = false;
      let width;
      let height;
      let drawItems = [];
     
      canvas.addEventListener('mousedown', setRect,false);
      canvas.addEventListener('mouseup', endRect,false);
      canvas.addEventListener('mouseout', endRect,false);
      canvas.addEventListener('mousemove', drawRect,false);
      canvas.addEventListener("touchstart", setRect, false);
      canvas.addEventListener("touchmove", drawRect, false);
      canvas.addEventListener("touchend", endRect, false);
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
                 ctx.strokeStyle = colors;
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
  // var markerColor = "#f00";
  var offsetX =canvas.offsetLeft;
   var offsetY = canvas.offsetTop;
  var startX;
  var startY;
  var isMouseDown = false;
  var circle, radius;

 canvas.addEventListener('mousedown', drawCircleMouseDown, false);
 canvas.addEventListener('mouseup', drawCircleMouseUp, false);
 canvas.addEventListener('mousemove', drawCircleMouseMove, false);
 canvas.addEventListener("touchstart", drawCircleMouseDown, false);
 canvas.addEventListener("touchmove", drawCircleMouseMove, false);
 canvas.addEventListener("touchend", drawCircleMouseUp,false);

 function Circle(startX, startY) {
     this.startX = startX;
     this.startY = startY;
     this.radius;
     this.draw = function() {
     ctx.beginPath();
     ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI);
    //  ctx.strokeStyle = markerColor;
    ctx.lineWidth=linebarWidth();
      ctx.strokeStyle = colors;
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

//***************/
//ELLIPSE TOOL
//*************/
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
    canvas.addEventListener("touchstart", startEllipse, false);
    canvas.addEventListener("touchmove", drawEllipse, false);
    canvas.addEventListener("touchend", endEllipse,false);
  }

  function drawEllipse(event){

    mousex = parseInt(event.clientX-canvas.offsetLeft);
    mousey = parseInt(event.clientY-canvas.offsetTop);
      if(mousedown) {
          ctx.clearRect(0,0,canvas.width,canvas.height); //clear canvas
          //Save
          ctx.save();
          ctx.beginPath();
           ctx.strokeStyle = colors;
          ctx.lineWidth = linebarWidth();
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
   ctx.strokeStyle=colors;
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}





// //**********************/
// //TEXT WRITING //
// //*********************/


// function textDraw(event) {
//   tool = "text";
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   mouse.x = event.offsetX;
//   mouse.y = event.offsetY;

//   var x = Math.min(mouse.x, textCoordinates.x);
//   var y = Math.min(mouse.y, textCoordinates.y);
//   var width = Math.abs(mouse.x - textCoordinates.x);
//   var height = Math.abs(mouse.y - textCoordinates.y);

//   textarea.style.left = x + "px";
//   textarea.style.top = y + "px";
//   textarea.style.width = width + "px";
//   textarea.style.height = height + "px";

//   textarea.style.display = "block";
// }


//Function to erase image
function eraseImage(event){
  let mouse={x:0,y:0};
  // let eraser;
  erasing = "true";
  tool = "eraser";
  eraseing(event);
  // mouse.x = e.offsetX ;
  // mouse.y =  e.offsetY ;	
  // // canvas is always cleared up before drawing.
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // var lw = linebarWidth();
  // eraser_width=lw+6;
  // var ss = ctx.strokeStyle;
  // ctx.lineWidth = 1;
  // ctx.strokeStyle = 'black';
  // ctx.beginPath();
  //   ctx.strokeRect(mouse.x, mouse.y, eraser_width, eraser_width);
  //   ctx.stroke();
  //   ctx.closePath();
  //   // restore linewidth
  //   ctx.lineWidth = lw;
  //   ctx.strokeStyle = ss;
  
}

function eraseing(event){
  let mouse={x:0,y:0};
   mouse.x = event.offsetX ;
   mouse.y =  event.offsetY ;
 
  if (erasing == "true") {
    ctx.globalCompositeOperation = "destination-out";
    eraser_width=linebarWidth()+6
    ctx.strokeRect(mouse.x, mouse.y, eraser_width, eraser_width);
  } else {
    ctx.globalCompositeOperation = "source-over";
  }
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

// function OpenImage(){

 
  // let img = new Image();
  // // Once the image is loaded clear the canvas and draw it
  // img.onload = function(){
  //     ctx.clearRect(0,0,canvas.width, canvas.height);
  //     ctx.drawImage(img,0,0);
  // }
  // img.src = 'image.png';
  
// }


function reload(){
  dataURL = canvas.toDataURL();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var image = new Image();
  image.onload = function () {
        ctx.drawImage(image, 0, 0);
  }
   image.src = dataURL;
}
   



// let fileInput = document.getElementById('fileinput');
// fileInput.addEventListener('change', function(ev) {
//    if(ev.target.files) {
//       let file = ev.target.files[0];
//       var reader  = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onloadend = function (e) {
//           var image = new Image();
//           image.src = e.target.result;
//           image.onload = function(ev) {
//              var canvas = document.getElementById('canvas');
//              canvas.width = image.width;
//              canvas.height = image.height;
//              var ctx = canvas.getContext('2d');
//              ctx.drawImage(image,0,0);
//          }
//       }
//    }
// });

