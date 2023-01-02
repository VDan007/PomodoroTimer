let timeDisplay = document.querySelector(".timerNumber");
let pomodoroTime = 25;
let shortBrake = 5;
let longBrake = 15;
let secPassed = 0;
let minutesLeft ;
let secondsLeft;
let interval;
let areWeCounting = false;
let currentPeriod = "pomodoro";

const startButton = document.getElementById("start");
const pomodoroButton = document.getElementById("pomodoroBtn");
const shortBrakeButton = document.getElementById("shortBrakeBtn");
const longBrakeButton = document.getElementById("longBrakeBtn");
startButton.addEventListener("click",startStopTimer);


function startStopTimer(){
    if(areWeCounting){
        clearInterval(interval);
        startButton.innerText = "Start";
        areWeCounting = false;

    }else{ 
     interval = setInterval( update, 1000,pomodoroTime);
     startButton.innerText = "Pause";
     areWeCounting = true;
    }

     
}



function update (period){
    let TimeInSec = period * 60;
    secPassed++;
    minutesLeft =  Math.floor(  (TimeInSec - secPassed) / 60 );
    secondsLeft = TimeInSec -(minutesLeft * 60) -secPassed ;
    timeDisplay.innerText = " ";
    timeDisplay.innerText = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    document.title = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    if (secondsLeft <= 0) {
        clearInterval(interval);
    }
}


