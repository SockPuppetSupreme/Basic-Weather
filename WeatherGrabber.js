
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
	
	//determine case for rendering,
	//the problem with weather.gov is that they have many different descriptions of the same thing.
	//http://w1.weather.gov/xml/current_obs/weather.php
	//so we must pick the most important word out of what ever description their giving us.
	//the importance of words goes something like clear < clouds < overcast < fog < rain < snow < thunderstorm
	//so even if the description is 'Thunderstorm Heavy Rain Fog/Mist' (which is indeed one of the listed descriptions)
	//it will only take the word thunderstorm out to render
	
	//fair/clear, cloudy/clouds, overcast, snow/freezing, fog, rain/drizzle/showers, thunderstorm
	
	if(grabberWeather.inOneWord.indexOf("Fair") > -1 || grabberWeather.inOneWord.indexOf("Clear")> -1){
		grabberWeather.caseForRendering = "Clear";
	}
	if(grabberWeather.inOneWord.indexOf("Cloudy") > -1 || grabberWeather.inOneWord.indexOf("Clouds")> -1){
		grabberWeather.caseForRendering = "Clouds";
	}
	if(grabberWeather.inOneWord.indexOf("Overcast")> -1){
		grabberWeather.caseForRendering = "Overcast";
	}
	if(grabberWeather.inOneWord.indexOf("Fog") > -1){
		grabberWeather.caseForRendering = "Fog";
	}
	if(grabberWeather.inOneWord.indexOf("Rain") > -1 || grabberWeather.inOneWord.indexOf("Drizzle") > -1 || grabberWeather.inOneWord.indexOf("Showers")> -1){
		grabberWeather.caseForRendering = "Rain";
	}
	if(grabberWeather.inOneWord.indexOf("Snow") > -1 || grabberWeather.inOneWord.indexOf("Freezing") > -1){
		grabberWeather.caseForRendering = "Snow";
	}
	if(grabberWeather.inOneWord.indexOf("Thunderstorm") > -1){
		grabberWeather.caseForRendering = "Thunderstorm";
	}
}