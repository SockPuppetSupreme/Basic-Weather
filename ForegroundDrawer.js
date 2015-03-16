

var canvas;
var ground;

function drawForeground(canvasArg,weather){
	
	canvas = canvasArg;
	ground = canvas.getContext('2d');
	
    
    ground.beginPath()
    ground.rect(0, canvas.height-85, canvas.width, 300)
    ground.fillStyle = '#A1A949'
    ground.fill()

}
