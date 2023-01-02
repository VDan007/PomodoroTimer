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
    timeDisplay.innerText = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    document.title = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    if (secondsLeft <= 0) {
        clearInterval(interval);
    }
}



let interval = setInterval( update, 1000);