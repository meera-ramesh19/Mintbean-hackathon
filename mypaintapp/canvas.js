
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
let pencilCoordinates={x: 0, y: 0};
let lineCoordinates = {x: 0, y: 0};
let textCoordinates = {x: 0, y: 0};
let pointCoordinates = {x: 0, y: 0};
let crayonCoordinates = {x: 0, y: 0};
let tool="freedraw";
let strokeStyle='black';
let crpts=[];

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
canvas.addEventListener('DOMContentLoaded', init);
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseout", stop, false);
window.addEventListener("resize", resize);

resize();


//tools eventListener
document.querySelector("#line").addEventListener('click', line);
document.querySelector("#fill").addEventListener('click', fillColor);
document.querySelector("#points").addEventListener('click', drawPoints);
document.querySelector("#pencil").addEventListener('click', pencil);
document.querySelector("#crayon").addEventListener('click', crayon);
document.querySelector("#rectangle").addEventListener('click', rectangle);
document.querySelector("#circle").addEventListener('click',circle);
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
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("touchmove", draw, false);
    reposition(event);
    
 } 
 

function stop() {
    if(drawing){
      ctx.stroke();
      ctx.closePath();
      drawing=false;
   }
     canvas.removeEventListener("mousemove", draw, false);
     canvas.addEventListener("touchmove", draw, false);
}

//This collects the RGB values in the CSS file so you can assign them to the strokeStyle()
const changeColors = (event) => {
  const newColor = event.target.id;
  console.log(newColor)
  let assignedNewColorRGB = window.getComputedStyle(document.querySelector(`#${newColor}`), null).getPropertyValue('background-color');
  console.log(assignedNewColorRGB)
  // document.querySelector('h3').innerHTML = assignedNewColorRGB;
  return ctx.strokeStyle = assignedNewColorRGB;
}
document.querySelector('.color-panel').addEventListener('click', changeColors)


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

/************** */
// PENCIL TOOL
/**************** */
   function pencil(event){
     tool="pencil"
     canvas.removeEventListener("mousemove", draw, false);
     canvas.removeEventListener("mousedown", draw, false);


     mouse.x = event.offsetX ;
     mouse.y = event.offsetY;

     canvas.addEventListener("touchstart", startPencil, false);
    canvas.addEventListener("mousedown", startPencil, false);
    canvas.addEventListener("touchmove", drawPencil, false);
    canvas.addEventListener("mousemove", drawPencil, false);
    canvas.addEventListener("mouseup", stopPencil, false);
    canvas.addEventListener("touchend", stopPencil, false);
    canvas.addEventListener("mouseout", stopPencil, false);


    function startPencil(){
      drawPencil=true;
      mymouseDown=true;
      canvas.addEventListener("mousemove", drawPencil, false);
      canvas.addEventListener("touchmove", drawPencil, false);
      // reposition(event);

    }

    function drawPencil(){
      if (!drawPencil) return;
      if(drawPencil && mymouseDown){
    
            //console.log(mouse.x + " "+mouse.y);
            // Saving all the points in an array
            ppts.push({x: mouse.x, y: mouse.y});
 
            if (ppts.length < 3) {
                   var b = ppts[0];
                   ctx.beginPath();
                        //ctx.moveTo(b.x, b.y);
                   //ctx.lineTo(b.x+50, b.y+50);
                   ctx.arc(b.x, b.y, ctx.lineWidth() / 2, 0, Math.PI * 2, !0);
                   ctx.fill();
                   ctx.closePath();
                   return;
            }
     
            //  canvas is always cleared up before drawing.
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.beginPath();
            ctx.moveTo(ppts[0].x, ppts[0].y);
            
            for (var i = 0; i < ppts.length; i++) 
              ctx.lineTo(ppts[i].x, ppts[i].y);
            
            ctx.stroke();
          }
      }

      
     function stopPencil() {
        if(drawPencil){
          ctx.stroke();
          ctx.closePath();
          drawPencil=false;
          }
         canvas.removeEventListener("mousemove", drawPencil, false);
         canvas.addEventListener("touchmove", drawPencil, false);
     }

} 

/************** */
// CRAYON TOOL
/**************** */

function crayon(event){
    tool="crayon"
    canvas.removeEventListener("mousemove", draw, false);
    canvas.removeEventListener("mousedown", draw, false);
    
    ctx.globalAlpha = 0.4;
    let startPosition = {x: 0, y: 0};
    crayonCoordinates.x=event.offsetX;
    crayonCoordinates.y=event.offsetY; 
    let crayonDraw = false;
    mouse.x = event.offsetX ;
    mouse.y = event.offsetY;
    let clickX = new Array();
    let clickY = new Array();
    let clickDrag = new Array();
    
  

    canvas.addEventListener("touchstart", startCrayon, false);
   canvas.addEventListener("mousedown", startCrayon, false);
   canvas.addEventListener("touchmove", drawCrayon, false);
   canvas.addEventListener("mousemove", drawCrayon, false);
   canvas.addEventListener("mouseup", stopCrayon, false);
   canvas.addEventListener("touchend", stopCrayon, false);
   canvas.addEventListener("mouseout", stopCrayon, false);


   function startCrayon(event){
      crayonDraw=true;
       mymouseDown=true;
    //  canvas.addEventListener("mousemove", drawCrayon, false);
    //  canvas.addEventListener("touchmove", drawCrayon, false);
    //  // reposition(event);
       let mouseX = event.pageX - this.offsetLeft;
       let mouseY = event.pageY - this.offsetTop;
       addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop);
       redraw();

   }

   function drawCrayon(){
     if (!crayonDraw) return;
     if(crayonDraw){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
      }
    }
 
     function addClick(x, y, dragging)
        {
          clickX.push(x);
          clickY.push(y);
          clickDrag.push(dragging);
        }


     function redraw(){
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  
          ctx.strokeStyle = "#df4b26";
          ctx.lineJoin = "round";
          ctx.lineWidth = 5;
			
          for(var i=0; i < clickX.length; i++) {		
              ctx.beginPath();
              if(clickDrag[i] && i){
                    ctx.moveTo(clickX[i-1], clickY[i-1]);
              }else{
                     ctx.moveTo(clickX[i]-1, clickY[i]);
              }
              ctx.lineTo(clickX[i], clickY[i]);
              ctx.closePath();
              ctx.stroke();
           }

            ctx.globalAlpha = 0.8;
            ctx.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
        
      }


    function stopCrayon() {
       if(crayonDraw){
         ctx.stroke();
         ctx.closePath();
         crayonDraw=false;
         }
        // ctx.globalAlpha = 1;
        canvas.removeEventListener("mousemove", drawCrayon, false);
        canvas.addEventListener("touchmove", drawCrayon, false);
    }


}

/*********************** */
//Select Points Tool
/********************** */

function drawPoints(event){

    tool="points";
    let isstart=false
    canvas.removeEventListener("mousemove", draw, false);
    canvas.removeEventListener("mousedown", draw, false);
    let pointSize = 6;
    console.log("in")
   canvas.addEventListener("mousedown" ,draw, false);
   canvas.addEventListener("mouseup", stop, false);
     
function draw(event){
  getPosition(event)
}

function stop(){
 canvas.removeEventListener("mousedraw" , draw, false);
}

 function getPosition(event){
   console.log("in-in")
      var rect = canvas.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;   
      console.log(x,y)   
      drawCoordinates(x,y);
 }
 
 function drawCoordinates(x,y){	
  
     ctx.fillStyle = "#ff2626"; // Red color
     ctx.beginPath();
     ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
     ctx.fill();
   
 }

}




/******************** */
//Select Line Tool
/****************** */



function line(event){


//ClientX -away from the edge of the body/screen to mouse click position
//Screenx -away from the edge of the entire computer screen
//offsetX -same as clientx minus the difference of the element/pixels from the start of the element edge/border of the canvas
    canvas.removeEventListener("mousemove", draw, false);
    canvas.removeEventListener("mousedown", draw, false);
    
     tool="line";
     let startPosition = {x: 0, y: 0};
     lineCoordinates.x=event.offsetX;
     lineCoordinates.y=event.offsetY;
     console.log(lineCoordinates)
     let isDrawStart = false;
    
    // const getClientOffset = (event) => {
    //     const {pageX, pageY} = event.touches ? event.touches[0] : event;
    //     const x = pageX - canvas.offsetLeft;
    //     const y = pageY - canvas.offsetTop;
    
    //     return {
    //        x,
    //        y
    //     } 
    // }
    
    const drawLines = () => {
      //  ctx.clearRect(0, 0, canvas.width,canvas.height);
      //  ctx.beginPath();
      //  ctx.lineWidth = linebarWidth();
      //  ctx.lineCap = "round";
      //  ctx.lineJoin ="round";
      //  ctx.moveTo(startPosition.x, startPosition.y);
      //  ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
      //  ctx.stroke();
      //  ctx.closePath();
      lineCoordinates.x =  event.offsetX ;
      lineCoordinates.y =  event.offsetY ;	
		// Tmp canvas is always cleared up before drawing.
    	ctx.clearRect(0, 0, canvas.width,canvas.height);
 
    	ctx.beginPath();
    	ctx.moveTo(startPosition.x, startPosition.y);
    	ctx.lineTo(lineCoordinates.x, lineCoordinates.y);
      ctx.stroke();
      ctx.closePath();

    }
    
    const startDraw = (event) => {
       startPosition = getClientOffset(event);
       isDrawStart = true;
      canvas.addEventListener("mousemove", lineDraw, false);
      canvas.addEventListener("touchmove", lineDraw, false);
    }
    
    const lineDraw = (event) => {
      if(!isDrawStart) return;
      // lineCoordinates = getClientOffset(event);
      drawLines();
    }
    
    const stopDraw = (event) => {
      isDrawStart = false;
      canvas.removeEventListener("mousemove", linedraw, false);
      canvas.removeEventListener('touchmove',  lineDraw, false);
    }
    
    const clearCanvas = () => {
       ctx.clearRect(0, 0, canvasEle.width, canvasEle.height);
    }
    
    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', lineDraw, false);
    canvas.addEventListener('mouseup', stopDraw, false);
    
    canvas.addEventListener('touchstart',  startDraw, false);
    canvas.addEventListener('touchmove',  lineDraw, false);
    canvas.addEventListener('touchend', stopDraw, false);

}


//**************** */
//SELECT RECTANGLE TOOL

/*****************/


function rectangle(event){
   
   canvas.removeEventListener("mousemove", draw, false);
    canvas.removeEventListener("mousedown", draw, false);
    
    ctx.globalAlpha = 1.0;
    let startPosition = {x: 0, y: 0};
    mouse.x =event.offsetX;
    mouse.y =event.offsetY; 
    let rectStart = false;
    canvas.addEventListener("touchstart", startRect, false);
    canvas.addEventListener("mousedown", drawRect, false);
    canvas.addEventListener("touchmove", drawRect, false);
    canvas.addEventListener("mousemove", drawRect, false);
    canvas.addEventListener("mouseup", stopRect, false);
    canvas.addEventListener("touchend", stopRect, false);
    canvas.addEventListener("mouseout", stopRect, false);
 
 
    function startRect(event){
       rectStart=true;
       mymouseDown=true;
       canvas.addEventListener("mousemove", drawRect, false);
       canvas.addEventListener("touchmove", drawRect, false);
     //  // reposition(event);
        
 
    }
 
    function drawRect(){
      if (!crayonDraw) return;
      if(crayonDraw){
         mouse.x =  event.offsetX ;
		     mouse.y =  event.offsetY ;	
		   // Tmp canvas is always cleared up before drawing.
       	ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
        ctx.beginPath();
        ctx.moveTo(start_mouse.x, start_mouse.y);

	       let x = Math.min(mouse.x, start_mouse.x);
		     let y = Math.min(mouse.y, start_mouse.y);
	       let width = Math.abs(mouse.x - start_mouse.x);
	       let  height = Math.abs(mouse.y - start_mouse.y);
  	    ctx.strokeRect(x, y, width, height);
	     	ctx.closePath();
        }

    }

     function stopRect(){
        rectStart = false;
        canvas.removeEventListener("mousemove", drawRect, false);
        canvas.removeEventListener('touchmove',  drawRect, false);
      }
      
      const clearCanvas = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      canvas.addEventListener('mousedown', drawRect, false);
      canvas.addEventListener('mousemove', drawRect, false);
      canvas.addEventListener('mouseup', stopRect, false);
      
      canvas.addEventListener('touchstart',  drawRect, false);
      canvas.addEventListener('touchmove',  drawRect, false);
      canvas.addEventListener('touchend', stopRect, false);
     


}





function circle(event){
   
  canvas.removeEventListener("mousemove", draw, false);
   canvas.removeEventListener("mousedown", draw, false);
   
   ctx.globalAlpha = 1.0;
   let startPosition = {x: 0, y: 0};
   crayonCoordinates.x=event.offsetX;
   crayonCoordinates.y=event.offsetY; 
   let cirleStart = false;
   let circleCoordinates ={x:0,y:0};
   canvas.addEventListener("touchstart", startCircle, false);
   canvas.addEventListener("mousedown", drawCircle, false);
   canvas.addEventListener("touchmove", drawCircle , false);
   canvas.addEventListener("mousemove", drawCircle, false);
   canvas.addEventListener("mouseup", stopCircle, false);
   canvas.addEventListener("touchend", stopCircle, false);
   canvas.addEventListener("mouseout", stopCircle, false);


   function startCircle(event){
      circleStart=true;
      mymouseDown=true;
      canvas.addEventListener("mousemove", drawCircle, false);
      canvas.addEventListener("touchmove", drawCircle, false);
    //  // reposition(event);
       

   }

   function drawCircle(event){
     if (!circleStart) return;
     if(circleStart){
      mouse.x =  event.offsetX ;
      mouse.y =  event.offsetY ;	
      // Tmp canvas is always cleared up before drawing.
        ctx.clearCircle(0, 0, canvas.width, canvas.height);
    
        var x = (mouse.x + circleCoordinates.x) / 2;
        var y = (mouse.y + circleCoordinates.y) / 2;
    
        //var radius = Math.max(Math.abs(mouse.x - start_mouse.x), Math.abs(mouse.y - start_mouse.y)) / 2;
        var a = mouse.x - circleCoordinates.x;
        var b = mouse.y -circleCoordinates.y;
        var r = Math.sqrt(a*a + b*b);
    
        ctx.beginPath();
        //tmp_ctx.arc(x, y, radius, 0, Math.PI*2, false);
        ctx.arc(circleCoordinates.x, circleCoordinates.y, r, 0, 2*Math.PI);
        // tmp_ctx.arc(x, y, 5, 0, Math.PI*2, false);
        ctx.stroke();
       ctx.closePath();
       }

   }

    function stopCircle(){
       circleStart = false;
       canvas.removeEventListener("mousemove", drawCircle, false);
       canvas.removeEventListener('touchmove',  drawCircle, false);
     }
     
     const clearCanvas = () => {
        ctx.clear(0, 0, canvas.width, canvas.height);
     }
     
     canvas.addEventListener('mousedown', drawCircle, false);
     canvas.addEventListener('mousemove', drawCircle, false);
     canvas.addEventListener('mouseup', stopCircle, false);
     
     canvas.addEventListener('touchstart',  drawCircle, false);
     canvas.addEventListener('touchmove',  drawCircle, false);
     canvas.addEventListener('touchend', stopCircle, false);
    
}




var paint_ellipse = function(e) {
  mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
  mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;	
  // Tmp canvas is always cleared up before drawing.
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    var x = start_mouse.x;
    var y = start_mouse.y;
    var w = (mouse.x - x);
    var h = (mouse.y - y);
   
    tmp_ctx.save(); // save state
      tmp_ctx.beginPath();

      tmp_ctx.translate(x, y);
      tmp_ctx.scale(w/2, h/2);
      tmp_ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);

      tmp_ctx.restore(); // restore to original state
      tmp_ctx.stroke();
      tmp_ctx.closePath();

}


//**************** */
//SELECT FILL TOOL

/*****************/




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

