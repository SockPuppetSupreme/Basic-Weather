

var canvas;
var sky;
var ground;

function drawBackground(canvasArg,weather){
	
    canvas = canvasArg;
	sky = canvas.getContext('2d');
	
	sky.rect(0, 0, canvas.width, canvas.height);
	sky.fillStyle = '#94DBFF';
	sky.fill();
}