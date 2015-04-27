function drawWeatherInformation(weatherArg){
			
    date = new Date();

    ctx.beginPath();
    ctx.rect(20,canvas.height-120,200,100);
    ctx.fillStyle = 'Black';
    ctx.fill();

    ctx.beginPath();
    ctx.rect(25,canvas.height-115,190,90);
    ctx.fillStyle = 'White';
    ctx.fill();

    //render text
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = "12px Georgia";
    ctx.fillText(date.getHours()+":"+date.getMinutes(),30,canvas.height-100);
    ctx.fillText(weatherArg.location,30,canvas.height-85);
    ctx.fillText(weatherArg.location,30,canvas.height-85);
    ctx.fillText(weatherArg.inOneWord,30,canvas.height-70);
    ctx.fillText(weatherArg.curTemp+" F",30,canvas.height-55);
    ctx.fillText(weatherArg.windSpeed+" mph winds",30,canvas.height-40);
            
}