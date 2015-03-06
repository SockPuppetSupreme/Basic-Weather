
function Weather(){
	
	this.inOneWord = "Sunny";
	
}

function grabWeatherConditions(lat,longit){
	console.log(lat + ", "+ longit);
	
	weather = new Weather()
	weather.inOneWord = "Rainy";
	return weather;
}