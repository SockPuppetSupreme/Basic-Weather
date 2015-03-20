

var canvas;
var sky;
var ground;

function drawBackground(canvasArg,weather){
	
    canvas = canvasArg;
	sky = canvas.getContext('2d');
	
    //Build a color
    var color = new Values('#94DBFF');
    color = color.shade(101-getLighting(weather));//need atleast 1.  If 0, defaults to shade(), and uses 50, so shade(50), when really it's bright out
    
	sky.rect(0, 0, canvas.width, canvas.height);
	//sky.fillStyle = '#94DBFF';
    sky.fillStyle = "#"+color.hex;
	sky.fill();
    
}