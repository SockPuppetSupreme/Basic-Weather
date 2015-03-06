

var canvas;
var ctx;

function drawBackground(canvasArg,weather){
	
	canvas = canvasArg;
	ctx = canvas.getContext('2d');
	
	console.log(weather.inOneWord);
}