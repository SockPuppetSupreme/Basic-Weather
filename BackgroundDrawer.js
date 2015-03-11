

var canvas;
var ctx;

function drawBackground(canvasArg,weather){
	
	canvas = canvasArg;
	ctx = canvas.getContext('2d');
	
	ctx.rect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = '#94DBFF';
	ctx.fill();
	
}