var lastAudioFramesWeather = "None";
function updateBackgroundAudio(weather){
    
    var myAudio;
    
    if(lastAudioFramesWeather != weather.inOneWord){
        
        if(myAudio != null){
            myAudio.pause();
        }
        
        if(weather.inOneWord === "Rain"){
            myAudio = new Audio("http://www.soundjay.com/nature/sounds/rain-03.mp3");
        }
        
        if(myAudio != null){
            myAudio.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
                myAudio.play();
        }
    }
    
    lastAudioFramesWeather = weather.inOneWord;
    
}