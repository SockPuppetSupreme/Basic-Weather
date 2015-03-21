

var canvas;
var ground;

function drawForeground(canvasArg,weather){
	
	canvas = canvasArg;
	ground = canvas.getContext('2d');
	
    var color = new Values('#A1A949');
    color = color.shade(101-getLighting(weather));
    
	//draw ground
    ground.beginPath();
    ground.rect(0, canvas.height-85, canvas.width, 300);
    ground.fillStyle = '#'+color.hex;
	
	//draw line
	color = new Values('#A1A949');
	color = color.shade(121-getLighting(weather));
	ground.strokeStyle = '#'+color.hex;
	ground.stroke();
	
    ground.fill()

}
