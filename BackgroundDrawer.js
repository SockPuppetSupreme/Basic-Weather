

var canvas;
var sky;
var ground;

function drawBackground(canvasArg,weather){
	
    canvas = canvasArg;
	sky = canvas.getContext('2d');
	
	sky.rect(0,0,canvas.width,canvas.height);
	sky.fillStyle = '#94DBFF';
	sky.fill();
	
    ground = canvas.getContext('2d')
    ground.rect(0, 0, canvas.width, 60px)
    ground.fillStyle = 'green'
    ground.fill()
}