
var canvas;
var ctx;

var clouds = [];
function drawWeather(canvasArg,weather){
	
	canvas = canvasArg;
	ctx = canvas.getContext('2d');

	if(clouds.length == 0){
		clouds[0] = new Cloud(300,70,1000,150);
		clouds[1] = new Cloud(100,120,700,150);
		clouds[2] = new Cloud(600,230,600,100);
	}
	
	for(var i = 0; i < clouds.length; i ++){
		clouds[i].draw();
		clouds[i].update();
	}

}

function CloudPoint(startX,startY,midX,midY,endX,endY){
	this.startX = startX;
	this.startY = startY;
	this.midX = midX;
	this.midY = midY;
	this.endX = endX;
	this.endY = endY;
}

function Cloud(startX, startY, width, height){
	
	this.velocity = 1;
	
	this.startDrawingPoint = new Vector2();
	this.points = [];
	
	this.startX = startX;
	this.startY = startY;
	this.width = width;
	this.height = height;
	
	//much thanks to http://www.html5canvastutorials.com/tutorials/html5-canvas-shape-fill/ for examples of the curve.
	this.draw = function(){
		
		// begin custom shape
		ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(this.startDrawingPoint.x, this.startDrawingPoint.y);
		for(var i = 0; i < this.points.length; i ++){
			ctx.bezierCurveTo(this.points[i].startX, this.points[i].startY, this.points[i].midX, this.points[i].midY, this.points[i].endX, this.points[i].endY);
		}

		// complete custom shape
		ctx.closePath();
		ctx.lineWidth = 3;
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.strokeStyle = '#8ED6FF';
		ctx.stroke();
		
	}
	
	this.update = function(){
		
		//moving the clouds cord along the x axis to make them appear to be moving.
		for(var i = 0; i < this.points.length; i ++){
			this.startX += this.velocity;
			this.points[i].startX += this.velocity;
			this.points[i].midX += this.velocity;
			this.points[i].endX += this.velocity;
		}
	
	}
	
	//got to create the points in the right order for drawing the cloud. Run
	this.createPoints = function(){

		//no more hard coding...
		//create a method that spits out random points around a circle square thing, super egg?
		//create method for creating the Benzier points based on the already generated points
	
		var midX = width/2;
		var midY = height/2;
	
		//equation of a eclipse:
		//x^2/a^2 + y^2/b^2 = 1
		//y = sqrt( ( 1 - (x^2/a^2) )b^2 )
		
		//go through and build a list of points going around an eclipse
		var numOfPoints = 4+Math.floor((Math.random() *5) )// this is doubled when going through.
		var pointsAlongElipse = [];
		var pointsToAddInReverse = []
		for(var i = 0; i < numOfPoints; i ++){
			var curX = ((this.width/numOfPoints)*i) - midX;
			var y = Math.sqrt(  (1-((curX*curX)/(midX*midX)) )*(midY*midY) ) ;
			pointsAlongElipse[pointsAlongElipse.length] = new Vector2(startX+midX + curX,startY+y+midY);
			pointsToAddInReverse[pointsToAddInReverse.length] = new Vector2(startX+midX + curX,(y*-1)+startY+midY);
		}
		for(var i = pointsToAddInReverse.length-1; i >0; i --){
			pointsAlongElipse[pointsAlongElipse.length] = pointsToAddInReverse[i];
		}
		
		//create the equivalent Benzier points... :(
		for(var i = 0; i < pointsAlongElipse.length-1; i ++){
			
			//x direction is how far over we should shift humps
			//point on graph  = (startX-curPointx)
			//if point > width/2 ; point = -point + width
			//x = point / width
			//x = 1-x;
			
			var xDirection = 0;
			var pnt = pointsAlongElipse[i].x - startX;
			if(pnt > width/2){ 
				pnt = (pnt*-1)+width; 
			}
			xDirection = pnt/(width/2);
			xDirection = 1-xDirection;
			xDirection *= width/4;
			if(pointsAlongElipse[i].x - startX < width/2){
				xDirection *= -1;
			}
			
			var yDirection = 0;
			pnt = pointsAlongElipse[i].y - startY;
			if(pnt > height/2){ 
				pnt = (pnt*-1)+height; 
			}
			yDirection = pnt/(height/2);
			yDirection = 1-yDirection;
			yDirection *= height/4;
			if(pointsAlongElipse[i].y - startY < height/2){
				yDirection *= -1;
			}
			
			this.points[this.points.length] = new CloudPoint(pointsAlongElipse[i].x+xDirection,pointsAlongElipse[i].y+yDirection,
															pointsAlongElipse[i+1].x+xDirection,pointsAlongElipse[i].y+yDirection, 
															pointsAlongElipse[i+1].x, pointsAlongElipse[i+1].y );
		}
		/*
		var xDirection = ((pointsAlongElipse[pointsAlongElipse.length-1].x)/(startX+width))*50;
		if(pointsAlongElipse[pointsAlongElipse.length-1].x < startX+(width/2)){
			xDirection *= -1;
		}
		var yDirection = ((pointsAlongElipse[pointsAlongElipse.length-1].y)/(startY+height))*-50;
		if(pointsAlongElipse[pointsAlongElipse.length-1].y > startY+(height/2)){
			yDirection *= -1;
		}
		*/
		var xDirection = 0;
		var pnt = pointsAlongElipse[pointsAlongElipse.length-1].x - startX;
		if(pnt > width/2){ 
			pnt = (pnt*-1)+width; 
		}
		xDirection = pnt/(width/2);
		xDirection = 1-xDirection;
		xDirection *= width/4;
		if(pointsAlongElipse[pointsAlongElipse.length-1].x - startX < width/2){
			xDirection *= -1;
		}
		
		var yDirection = 0;
		pnt = pointsAlongElipse[pointsAlongElipse.length-1].y - startY;
		if(pnt > height/2){ 
			pnt = (pnt*-1)+height; 
		}
		yDirection = pnt/(height/2);
		yDirection = 1-yDirection;
		yDirection *= height/4;
		if(pointsAlongElipse[pointsAlongElipse.length-1].y - startY < height/2){
			yDirection *= -1;
		}
		this.points[this.points.length] = new CloudPoint(pointsAlongElipse[pointsAlongElipse.length-1].x+xDirection,pointsAlongElipse[pointsAlongElipse.length-1].y+yDirection,
														pointsAlongElipse[0].x+xDirection,pointsAlongElipse[pointsAlongElipse.length-1].y+yDirection, 
														pointsAlongElipse[0].x, pointsAlongElipse[0].y );
		
		//need them to reset for 
		this.startDrawingPoint = new Vector2(pointsAlongElipse[0].x,pointsAlongElipse[0].y);
		
	}
	
	this.createPoints();
	
}


