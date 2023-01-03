let timeDisplay = document.querySelector(".timerNumber");
let pomodoro = 25;
let shortBrake = 5;
let longBrake = 15;
let secPassed = 0;
let minutesLeft ;
let secondsLeft;
let interval;
let areWeCounting = false;
let currentPeriod = "pomodoro";

const startButton = document.getElementById("start");
startButton.addEventListener("click",startStopTimer);

const pomodoroButton = document.getElementById("pomodoroBtn");
pomodoroButton.addEventListener("click",() => periodShift("pomodoro"));

const shortBrakeButton = document.getElementById("shortBrakeBtn");
const longBrakeButton = document.getElementById("longBrakeBtn");



function startStopTimer(){
    if(areWeCounting){
        clearInterval(interval);
        startButton.innerText = "Start";
        areWeCounting = false;

    }else{ 
     interval = setInterval( update, 1000,pomodoro);
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

function setTimer(period){
    let TimeInSec;
    console.log(period);
    if(period == "pomodoro"){
         TimeInSec = pomodoro * 60;
    }else if (period == "shortBrake"){
         TimeInSec = shortBrake * 60;
    }else {
        TimeInSec = longBrake * 60;
    }
        
    
   // let TimeInSec = period * 60;
    minutesLeft =  Math.floor(  (TimeInSec - secPassed) / 60 );
    secondsLeft = TimeInSec -(minutesLeft * 60) -secPassed ;
    timeDisplay.innerText = " ";
    timeDisplay.innerText = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
}

function periodShift(period){
    clearInterval(interval);
    currentPeriod = period;
    areWeCounting = false;
    secPassed = 0;
    setTimer(currentPeriod);
    
    
}
