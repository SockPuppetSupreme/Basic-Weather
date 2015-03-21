
function getLighting(weather){
   
    if(weather == null){
        return 100;   
    }
    
    var currentLighting = 100;
    

    
    var sliderValue = document.getElementById("sliderTime").value;
    var time = (sliderValue*24)/100;
    
    
    // get today's sunlight times for London
    var times = SunCalc.getTimes(new Date(), weather.lat, weather.lon);

    
    // format sunrise time from the Date object
    var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
    var sunsetStr = times.sunset.getHours()+ ':' + times.sunset.getMinutes();    
    //console.log(sunriseStr,sunsetStr);

    var dayLight = (times.sunsetStart.getHours() + (times.sunsetStart.getMinutes()/100)) - (times.sunriseEnd.getHours()+(times.sunriseEnd.getMinutes()/100))
    
    
    //(time*Math.PI)/12 is above 0 beteen 6 and 18, 12 hours so if you want 12 hours of daylight, divide by 12
    //so to get the amount of daylight we want we must divide (time*Math.PI)/daylight
    //to get the correct adjustment, subtract 6 from the time we want to start, and then add that to the current time(time is being treated as x
    var timeToStart = times.sunriseEnd.getHours()+(times.sunriseEnd.getMinutes()/100);
    var adjustment = timeToStart-6;
    currentLighting = 150*(     -1*Math.cos( (((time-adjustment)*Math.PI)/dayLight)  )        );
    
    //output
    document.getElementById("hour").innerHTML = time+ " daylight: "+dayLight+", time should start:~"+timeToStart;
    
    //making darker based on weather conditions
    /*
    if( weather.cascaseForRendering == "Clear" ){
        //let's keep it at 100 I guess
    } else if ( weather.cascaseForRendering == "Clouds" ){
        currentLighting -= 15;
    } else if ( weather.cascaseForRendering == "Overcast" ){
        currentLighting -=25;
    } else if ( weather.cascaseForRendering == "Fog" ){
        currentLighting -= 30;
    } else if ( weather.cascaseForRendering == "Rain" ){
        currentLighting -= 40;
    } else if ( weather.cascaseForRendering == "Thunderstorm" ){
        currentLighting -= 50;
    }
    */
    
    currentLighting = Math.min(currentLighting,100)
    
    if( document.getElementById('curDebugWeatherClear').checked){
        //let's keep it at 100 I guess
        console.log("Clear");
    } else if ( document.getElementById('curDebugWeatherClouds').checked ){
        currentLighting -= 15;
    } else if ( document.getElementById('curDebugWeatherOvercast').checked ){
        currentLighting -=25;
    } else if ( document.getElementById('curDebugWeatherFog').checked ){
        currentLighting -= 35;
    } else if ( document.getElementById('curDebugWeatherRain').checked ){
        currentLighting -= 30;
    } else if (document.getElementById('curDebugWeatherThunderstorm').checked ){
        currentLighting -= 40;
    }
    
    currentLighting = Math.max(currentLighting, 20);
    
    return currentLighting;
    
}