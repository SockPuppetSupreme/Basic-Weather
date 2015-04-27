
//Found this code explaining how to listen for and handle keypressed
//Determining which key is pressed
//http://www.javascriptkit.com/javatutors/javascriptkey2.shtml (Accessed Apr. 16 2015)
function handleUserInput(e){
    var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
    var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
    var actualkey=String.fromCharCode(unicode)
    
    //toggle Debug
    if (actualkey=="D"){
        toggleDebugMode();
    }
        
}