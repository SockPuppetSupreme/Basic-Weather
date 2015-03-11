
//a generic weather object for rest of drawers to use.
function Weather(){
	
	this.json;
	
	this.inOneWord = "None";
	
	this.curTemp = 0;
	
	this.windSpeed = 0;
	
	this.location = "Not found";
	
	this.caseForRendering = "Clear";
	
}


var grabberWeather;

function grabWeatherConditions(lat,lon){
	
	console.log(lat+","+lon)
	
	//creating new weather object for returning after this is all finished up
	grabberWeather = new Weather();
	
	//grabs weather info using JSONP which walls WeatherData, which modifies global grabberWeather
	$.getScript("http://forecast.weather.gov/MapClick.php?lat="+lat+"&lon="+lon+"&FcstType=json&callback=WeatherData");
	
	//returns weather grabber after being modified, or not
	return grabberWeather;
}

//takes in JSON data that has been formatted according to forecast.weather 
function WeatherData(data) {
	
	console.log(data.currentobservation.Weather); 
	
	//loading in info from the file
	grabberWeather.json = data;
	grabberWeather.inOneWord = data.currentobservation.Weather;
	grabberWeather.curTemp = data.currentobservation.Temp;
	grabberWeather.windSpeed = data.currentobservation.Winds;
	grabberWeather.location = data.location.areaDescription;
	
	//determine case for rendering../
	//fair/clear, cloudy/clouds, overcast, snow, fog
	
}