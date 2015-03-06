
function Weather(){
	
	this.inOneWord = "Sunny";
	
}

function grabWeatherConditions(lat,longit){
	
	//get weather info though
	var link = "forecast.weather.gov/MapClick.php?lat="+lat+"&lon="+longit+"&FcstType=jsonp";
	var info = getJSON(link);
	
	console.log(link+" , "+info);
	
	weather = new Weather();
	weather.inOneWord = "Rainy";
	
	return weather;
}

function getJSON(link){
	
	var grabbedJason = "";
	
	$(document).ready(function(){
				
		$("#tempAjaxStorage").load(link, function(response, status, xhr){
				if (status == "success"){
					
				} else {
					$("#tempAjaxStorage").html("An error occured: <br>" + xhr.status + " " + xhr.statusText+"</br> This could have occured from you the browser being IE or some anti virus protection"+
					"</br>Come on now we're not going to hurt you..")
				}
		});
		//$("#tempAjaxStorage").html("shit");		
				
	});
	
	grabbedJason = document.getElementById("tempAjaxStorage").innerHTML;
	
	return grabbedJason;
}