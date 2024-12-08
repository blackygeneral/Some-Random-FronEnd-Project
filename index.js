let txt = 'black', text = '';
let siz = 0, size = 0;
let erasersize = 0;
let initEraserSize = 0;
localStorage.setItem("txt", 'black');
let setFont = 10;
localStorage.setItem("siz", setFont);
localStorage.setItem("initEraserSize", 20);

let c = document.getElementById("canvas");
let ctx = c.getContext('2d');
c.width = window.innerWidth*0.97;
c.height = window.innerHeight*0.82;
    
var mouse = {x:10,y:10};

let flag = false;
let x1 = 0;
let y1 = 0;

window.addEventListener("mousedown",handleTrue);
window.addEventListener("mouseup",handleFalse);

function handleTrue(){
 	flag = true;
}

function handleFalse(){
 	flag = false;
}

function draw(){
  localStorage.setItem("initEraserSize", 0);
  localStorage.setItem("siz", setFont);
  window.addEventListener("mousemove", function(event){
  mouse.x = event.x - 10;
  mouse.y = event.y - 67;
  if (flag){
	ctx.beginPath();
	ctx.fillStyle = localStorage.getItem("txt");
	ctx.fillRect(mouse.x, mouse.y, localStorage.getItem("siz"), 8);
	ctx.fill();
  }
});
}

function eraseAll(){
	alert('You sure you want to erase everything');
	ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function eraser(){
  localStorage.setItem("siz", 0);
  localStorage.setItem("initEraserSize", 30);
  window.addEventListener("mousemove", function(event){
  mouse.x = event.x - 10;
  mouse.y = event.y - 67;
  if (flag){
  	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillRect(mouse.x, mouse.y, localStorage.getItem("initEraserSize"), localStorage.getItem("initEraserSize"));
	ctx.fill();
  }
});
}

function handleColorChng(){
  	let text = document.getElementById("1").value;
  	localStorage.setItem("txt", text);
  	draw();
}

function handleFontSize(){
  	setFont = document.getElementById("2").value;
  	localStorage.setItem("siz", setFont);
  	draw();
}