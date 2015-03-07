
//a generic weather object for rest of drawers to use.
function Weather(){
	
	this.json;
	
	this.inOneWord = "NONE";
	
}


var grabberWeather;

function grabWeatherConditions(lat,lon){
	
	//creating new weather object for returning after this is all finnished up
	grabberWeather = new Weather();
	
	//grabs weather info using JSONP which walls WeatherData, which modifies global grabberWeather
	$.getScript("http://forecast.weather.gov/MapClick.php?lat="+lat+"&lon="+lon+"&FcstType=json&callback=WeatherData");
	
	//returns weather grabber after being modified, or not
	return grabberWeather;
}

//takes in JSON data that has been formatted according to forecast.weather 
function WeatherData(data) {
	
	console.log(data.currentobservation.Weather); 
	
	grabberWeather.json = data;
	grabberWeather.inOneWord = data.currentobservation.Weather;
	
	
}