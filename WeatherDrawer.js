
var canvas;
var ctx;

function drawWeather(canvasArg,weatherArg){
	
	canvas = canvasArg;
	ctx = canvas.getContext('2d');

    
    /*
    if(weather.cascaseForRendering == "Clear"){
        cloudSpawnUpdate("Clear");
    } else if ( weather.cascaseForRendering == "Clouds" ){
        cloudSpawnUpdate("Clouds");
    } else if ( document.getElementById('curDebugWeatherOvercast').checked ){
        cloudSpawnUpdate("Overcast");
    } else if ( document.getElementById('curDebugWeatherFog').checked ){
        cloudSpawnUpdate("Fog");
    } else if ( document.getElementById('curDebugWeatherRain').checked ){
        cloudSpawnUpdate("Rain");
     } else if ( document.getElementById('curDebugWeatherSnow').checked ){
        cloudSpawnUpdate("Snow");
    } else if (document.getElementById('curDebugWeatherThunderstorm').checked ){
        cloudSpawnUpdate("Thunderstorm");
    }*/
    if(weatherArg != null){
        cloudSpawnUpdate(weatherArg.caseForRendering);
    }
}


var clouds = [];
var weatherDrawerlastFramesWeather = "Clouds";
function cloudSpawnUpdate(thisFramesWeatherCloudSpawnArg){
    
    //initialize clouds, this is just a cute bunch
    /*
    if(clouds.length == 0){
		clouds[0] = new Cloud(300,70,1000,150);
		clouds[1] = new Cloud(100,120,700,150);
		clouds[2] = new Cloud(600,230,600,100);
    }
    */
    
    //delete clouds if we've changed weather conditions
    if(weatherDrawerlastFramesWeather !== thisFramesWeatherCloudSpawnArg){
        clouds = [];
        console.log(weatherDrawerlastFramesWeather +" != "+thisFramesWeatherCloudSpawnArg);
    }
    
    //console.log("last frames weather: "+weatherDrawerlastFramesWeather);
    //console.log("this frames weather: "+thisFramesWeatherCloudSpawnArg);
    
    weatherDrawerlastFramesWeather = thisFramesWeatherCloudSpawnArg;
    
    
    //size of the clouds should be determined based on the weather. clouds
    //then we populate the clouds across the screen
    var widthOfClouds = 1;
    var heightOfClouds = 1;
    var averageDistanceBetweenClouds = 0;
    var averageStartingHeight = 0;
    var percipitation = "None";
    var percipitationMagnitude = 0;
    var adjustedLightingForClouds = 0;
        
    if(thisFramesWeatherCloudSpawnArg === "Clear"){
        
        widthOfClouds = window.innerWidth/5;
        heightOfClouds = widthOfClouds/5;
        averageDistanceBetweenClouds = heightOfClouds*4;
        averageStartingHeight = heightOfClouds;
        
    }else if(thisFramesWeatherCloudSpawnArg === "Clouds"){
    
        widthOfClouds = window.innerWidth/2;
        heightOfClouds = widthOfClouds/5;
        averageDistanceBetweenClouds = heightOfClouds;

    }else if(thisFramesWeatherCloudSpawnArg === "Overcast"){
    
        widthOfClouds = window.innerWidth/2;
        heightOfClouds = widthOfClouds/5;
        averageDistanceBetweenClouds = -heightOfClouds;
        averageStartingHeight = -heightOfClouds/1.5;
    
    }else if(thisFramesWeatherCloudSpawnArg === "Fog"){
       
        widthOfClouds = window.innerWidth/2;
        heightOfClouds = widthOfClouds/5;
        averageDistanceBetweenClouds = 0;
    
    }else if(thisFramesWeatherCloudSpawnArg === "Rain"){
       
        widthOfClouds = window.innerWidth/2;
        heightOfClouds = widthOfClouds/5;
        averageDistanceBetweenClouds = -heightOfClouds;
        averageStartingHeight = -heightOfClouds/1.5;
        percipitation = thisFramesWeatherCloudSpawnArg;
        adjustedLightingForClouds = -10;
        percipitationMagnitude = .7;
    
    }else if(thisFramesWeatherCloudSpawnArg === "Snow"){
       
        widthOfClouds = window.innerWidth/2;
        heightOfClouds = widthOfClouds/4.5;
        averageDistanceBetweenClouds = -heightOfClouds;
        averageStartingHeight = -heightOfClouds/1.5;
        percipitation = thisFramesWeatherCloudSpawnArg;
         percipitationMagnitude = .3;
    
    }else if(thisFramesWeatherCloudSpawnArg === "Thunderstorm"){
       
        widthOfClouds = window.innerWidth/1.5;
        heightOfClouds = widthOfClouds/4;
        averageDistanceBetweenClouds = -heightOfClouds;
        averageStartingHeight = -heightOfClouds/1.5;
        percipitation = thisFramesWeatherCloudSpawnArg;
        adjustedLightingForClouds = -15;
         percipitationMagnitude = .9;
        
    }

    //create initial clouds
    if(clouds.length == 0){
        
        var numOfCloudsToSpawn = (window.innerWidth/(widthOfClouds+averageDistanceBetweenClouds)) +2;//plus two is two put behind the screen
        for(var i = 0; i < numOfCloudsToSpawn; i ++){
            clouds.push( new Cloud( (i-2)*(widthOfClouds+(averageDistanceBetweenClouds/2 + averageDistanceBetweenClouds*Math.random())), averageStartingHeight/2 + (averageStartingHeight/2 *Math.random()), widthOfClouds*.9 + (widthOfClouds*.3*Math.random()), heightOfClouds ) );
        }
        
        //scrable clouds so their not evenly stacked on one another in rendering
        for(var i = 0; i <clouds.length; i ++){
            var rndIndex = Math.floor((Math.random() * clouds.length) )
            var tempCloud = clouds[i];
            clouds[i] = clouds[rndIndex];
            clouds[rndIndex] = tempCloud;
        }

    } else { //make sure we're keepingn the screen filled with clouds as others exit the screen we need to delete them
        
        //removing clouds on end
        for(var i = clouds.length -1; i >= 0; i --){
            if(clouds[i].startX > window.innerWidth + (clouds[i].width)){//once it's made it's way entirely off the screen
                 clouds.splice(i, 1);
            }
        }
        
        //adding in clouds in start if we need to.
        var needAnotherCloud = false;
        var cloudFurtherstLeft = clouds[0];
        for(var i = 0; i < clouds.length; i ++){
            if(clouds[i].startX < cloudFurtherstLeft.startX){
                cloudFurtherstLeft = clouds[i];
            }
        }
        if(cloudFurtherstLeft.startX+widthOfClouds>0){
            clouds.push( new Cloud( cloudFurtherstLeft.startX-(widthOfClouds+(averageDistanceBetweenClouds/2 + averageDistanceBetweenClouds*Math.random())), averageStartingHeight * Math.random(), widthOfClouds*.9 + (widthOfClouds*.3*Math.random()), heightOfClouds ) );
        }
        
    }
    
    //update the clouds
    for(var i = 0; i < clouds.length; i ++){
		clouds[i].draw(getLighting(weather)+adjustedLightingForClouds, percipitation,percipitationMagnitude);
		clouds[i].update();
        //console.log("("+clouds[i].startX+", "+clouds[i].startY+", "+clouds[i].width+", "+clouds[i].height+")");
	}
    
    
    //console.log("Number of clouds: "+clouds.length );
    

}


function CloudPoint(startX,startY,midX,midY,endX,endY){
	this.startX = startX;
	this.startY = startY;
	this.midX = midX;
	this.midY = midY;
	this.endX = endX;
	this.endY = endY;
}

function PercipitationDrop(setXStart, setYStart, setColor){
        
    this.xVelocity = -5;
    this.yVelocity = 15;
    this.size = 2;
    this.xPosition = setXStart;
    this.yPosition = setYStart;
    
    this.color = '2F8DB5';
    if(setColor != null){
        this.color =setColor;
    }
    
    this.draw = function(){
        ctx.beginPath();
        ctx.moveTo(this.xPosition, this.yPosition);
        ctx.lineTo(this.xPosition+this.xVelocity, this.yPosition+this.yVelocity);
        ctx.lineWidth = this.size;
        ctx.strokeStyle = '#'+this.color;
        ctx.stroke();
    }
    
    this.update = function(){
        this.xPosition += this.xVelocity;
        this.yPosition += this.yVelocity;
    }
    
    //the peripitation drop should only be killed if it's off the screen.
    this.shouldKill = function(){
        if(this.yPosition > window.innerHeight){
            return true;    
        }
        return false;
    }
    
}

function Cloud(startX, startY, width, height){
	
	this.velocity = 5;//pixels per second
	this.time = Date.now();
	
	this.startDrawingPoint = new Vector2();
	this.points = [];
	
	this.startX = startX;
	this.startY = startY;
	this.width = width;
	this.height = height;
    
    var curPercipitationDrops = [];
	
	//much thanks to http://www.html5canvastutorials.com/tutorials/html5-canvas-shape-fill/ for examples of the curve.
	this.draw = function(lighting, percipitation, magnitude){//lighting is a number 1-100, percipitation is a string like "Rain", magnitude is how hard to percipitate between 0 - 1
        
        //drawing percipitation if there is any;
        if(this.curPercipitationDrops != null){
            //draw percipitation first
            for(var i = 0; i < this.curPercipitationDrops.length; i ++){
                this.curPercipitationDrops[i].draw();
            }

            //creating percipitation
            if(percipitation != "None" && Math.random() <magnitude){
                this.curPercipitationDrops.push(new PercipitationDrop(this.startX + (Math.random()*this.width), this.startY +(height/2)) );
                if( percipitation === "Snow"){
                    this.curPercipitationDrops[this.curPercipitationDrops.length-1].color = "FFFFFF";
                    this.curPercipitationDrops[this.curPercipitationDrops.length-1].xVelocity = 2;
                    this.curPercipitationDrops[this.curPercipitationDrops.length-1].yVelocity = 5;
                }
            }
        } else {
            //creating percipitation
            if(percipitation != "None" && Math.random() <magnitude){
                this.curPercipitationDrops = [];
                this.curPercipitationDrops[0] = (new PercipitationDrop(this.startX + (Math.random()*this.width), this.startY +(height/2)) );
                if( percipitation === "Snow"){
                    this.curPercipitationDrops[this.curPercipitationDrops.length-1].color = "FFFFFF";
                    this.curPercipitationDrops[this.curPercipitationDrops.length-1].xVelocity = 3;
                    this.curPercipitationDrops[this.curPercipitationDrops.length-1].yVelocity = 7;
                }
            }
        }

        
		// begin custom shape
		ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(this.startDrawingPoint.x, this.startDrawingPoint.y);
		for(var i = 0; i < this.points.length; i ++){
			ctx.bezierCurveTo(this.points[i].startX, this.points[i].startY, this.points[i].midX, this.points[i].midY, this.points[i].endX, this.points[i].endY);
		}

        
        var cloudColor = new Values('#FFFFFF');
        cloudColor = cloudColor.shade(101-lighting);
        
        var cloudOutline = new Values('#8ED6FF');
        cloudOutline = cloudOutline.shade(111-lighting);
        
		// complete custom shape
		ctx.closePath();
		ctx.lineWidth = 3;
		ctx.fillStyle = '#'+cloudColor.hex;
		ctx.fill();
		ctx.strokeStyle = '#'+cloudOutline.hex;
		ctx.stroke();
		
	}
	
	this.update = function(){
		
        if(this.curPercipitationDrops != null){
            
            //update percipitation
            for(var i = 0; i < this.curPercipitationDrops.length; i ++){
                this.curPercipitationDrops[i].update();
            }

            //removing percipitation that needs to go
            for(var i = this.curPercipitationDrops.length -1; i >= 0; i --){
                if(this.curPercipitationDrops[i].shouldKill()){
                     this.curPercipitationDrops.splice(i, 1);
                }
            }
        }
        
        
		var movement = (Date.now() - this.time)/1000;
		movement *= this.velocity;
        this.startX += movement;

		
		//moving the clouds cord along the x axis to make them appear to be moving.
		for(var i = 0; i < this.points.length; i ++){
			this.points[i].startX += movement;
			this.points[i].midX += movement;
			this.points[i].endX += movement;
		}
		this.startDrawingPoint.x += movement;
		
		this.time = Date.now();
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
		var numOfPoints = 5+Math.floor((Math.random() *5) )// this is doubled when going through.
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


