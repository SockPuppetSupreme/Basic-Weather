

var canvas;
var ground;

function drawForeground(canvasArg,weather){
	
	canvas = canvasArg;
	ground = canvas.getContext('2d');
	
    var color = new Values('#A1A949');
    color = color.shade(101-getLighting(weather));
    
    ground.beginPath()
    ground.rect(0, canvas.height-85, canvas.width, 300)
    ground.fillStyle = '#'+color.hex;
    ground.fill()

}
