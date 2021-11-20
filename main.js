
//Array fo colors to display as color options 
let colors =  ['#FFFFFF','#FF0000','#87CEEB','#FFA500','#FFFF00',
               '#008000','#008080','#808080','#000000','#A52A2A',
               '#0000FF','#800080','#FFC0CB']
              
 //             '#8E53A1', '#6ABD46', '#71CCDC', '#F7ED45', '#F7DAAF', '#EC2527', '#F16824', '#CECCCC', '#5A499E', '#06753D', '#024259', '#FDD209', '#7D4829', '#931B1E', '#B44426', '#979797', '#C296C5', '#54B948', '#3C75BB', '#F7ED45', '#E89D5E', '#F26F68', '#F37123', '#676868', '#9060A8', '#169E49', '#3CBEB7', '#FFCD37', '#E5B07D', '#EF3C46', '#FDBE17', '#4E4D4E', '#6B449B', '#BACD3F', '#1890CA', '#FCD55A', '#D8C077', '#A62E32', '#F16A2D', '#343433', '#583E98', '#BA539F', '#9D2482', '#DD64A5', '#DB778D', '#EC4394', '#E0398C', '#68AF46', '#4455A4', '#FBEE34', '#AD732A', '#D91E36', '#F99B2A']

// <div>Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


// initialize config variables here

let drawing=false;
let strokeColor='black';
let lineWidth=1;
 let coord = { x: 0, y: 0 };
var lastEvent;
var mouseDown = false;

// setup config variables and start the program

  const canvas = document.querySelector('#my-canvas')
  let ctx = canvas.getContext('2d');

//determine the height and the wisth of the canvas
  ctx.canvas.width = window.innerWidth-60
  ctx.canvas.height = window.innerHeight-60

// fill the canvas with the specified color
//not sure why it is not working needs to be fixed
  ctx.beginPath();
  ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
  ctx.fillStyle="#FBF5EF";
  ctx.fill();

 
  

     function init () { 
 

// initiating 2D context on it
 
  ctx.strokeStyle=strokeColor;
       ctx.lineWidth=lineWidth;
       
};  
       // wait for the HTML to load
document.addEventListener('DOMContentLoaded', init);
document.addEventListener("touchstart", start, false);
document.addEventListener("touchmove", draw, false);
document.addEventListener("mousedown", start, false);
document.addEventListener("mouseup", stop, false);
window.addEventListener("resize", resize);
document.querySelector('#color').addEventListener('hover', ChangeColor);
document.querySelector('#clear').addEventListener('click', ClearImage);
document.querySelector('#erase').addEventListener('click', EraseImage);
resize();

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
  document.addEventListener("mousemove", draw, false);
  reposition(event);
}


function stop() {
  document.removeEventListener("mousemove", draw, false);
}


function draw(event) {
 if(drawing){
  //begins or resets a path
  ctx.beginPath();
  //specifies the current line width
  ctx.lineWidth = 2;
  //style of endcaps for a line
  ctx.lineCap = "round";
  ctx.lineJoin ="round";
  //moves to specified point without creating a line
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  //adds anew point and creates a line from that point to the last specified point
  ctx.lineTo(coord.x, coord.y);
  //draws the path on to the canvas
  ctx.stroke();
 }
}

//Function to erase image not working needs to be fixed

function ClearImage(){
  // bind event handler to clear button
 
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   // ctx.beginPath();
//         ctx.fillStyle = "rgba(0, 0, 0, 255)";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);    
//         ctx.stroke();
    
 
      // document.getElementById('erase').addEventListener('click', ()=>{
      //     ctx.clearRect(0, 0, canvas.width, canvas.height);
      //   }, false);

}


//function to erase image
function EraseImage(){
  ctx.globalCompositeOperation="destination-out";
//     if (bMouseDown) {
// 			context.strokeStyle = strokeStyle;
//             context.lineWidth = 5;
//             context.beginPath();
//             if(bErasing == true){
//               context.globalCompositeOperation="destination-out";
//             }else{
//               context.globalCompositeOperation="source-over";
//             }
//             context.moveTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
//             context.lineTo(e.pageX ,e.pageY);
//             context.stroke();


}

//Select the color button to display the color swatch

    // document.getElementById("color").addEventListener('click', ChangeColor);

function ChangeColor(){
  console.log('in')
   event.preventDefault();
    colors.map((color) =>{ 
      console.log(color)
      document.getElementById('container').innerHTML +=
      `<div id='color-swatch' style='background: ${color};'></div>`
    });  
   
}




