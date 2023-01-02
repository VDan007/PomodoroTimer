let timeDisplay = document.querySelector(".timerNumber");
let startingTime = 25;
let startingTimeInSec = startingTime * 60;
let secPassed = 0;
let minutesLeft ;
let secondsLeft;



function update (){
    secPassed++;
    minutesLeft =  Math.floor(  (startingTimeInSec - secPassed) / 60 );
    secondsLeft = startingTimeInSec -(minutesLeft * 60) -secPassed ;
    timeDisplay.innerText = " ";
    timeDisplay.innerText = `${minutesLeft}:${secondsLeft}`;
    
    
}



const interval = setInterval( update, 1000);