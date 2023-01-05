let timeDisplay = document.querySelector(".timerNumber");
let pomodoro = 25;
let shortBrake = 5;
let longBrake = 15;
let secPassed = 0;
let minutesLeft ;
let secondsLeft;
let timeInSec;
let interval;
let areWeCounting = false;
let currentPeriod = "pomodoro";

const startButton = document.getElementById("start");
startButton.addEventListener("click",startStopTimer);

const pomodoroButton = document.getElementById("pomodoroBtn");
pomodoroButton.addEventListener("click",(e) => classListModifier(e));
pomodoroButton.addEventListener("click",() => periodShift("pomodoro"));

const shortBrakeButton = document.getElementById("shortBrakeBtn");
shortBrakeButton.addEventListener("click",(e) => classListModifier(e));
shortBrakeButton.addEventListener("click",() => periodShift("shortBrake"));


const longBrakeButton = document.getElementById("longBrakeBtn");
longBrakeButton.addEventListener("click",(e) => classListModifier(e));
longBrakeButton.addEventListener("click",() => periodShift("longBrake"));


/////////////////css logic///////////////////////////

function classListModifier(e){
    e.preventDefault();
   const periodBtns =  document.querySelectorAll(".periodBtn");
   periodBtns.forEach(el => el.classList.remove("currentPeriod"));
   e.target.classList.add("currentPeriod");
}

/////////////////css logic///////////////////////////


////////////////////////////////timer logic///////////////////////////
function startStopTimer(){
    if(areWeCounting){
        clearInterval(interval);
        startButton.innerText = "Start";
        areWeCounting = false;

    }else{ 
     interval = setInterval( moveTimer, 1000);
     startButton.innerText = "Pause";
     areWeCounting = true;
    }

     
}



function moveTimer (){

   secPassed++;
   minutesLeft =  Math.floor(  (timeInSec - secPassed) / 60 );
    secondsLeft = timeInSec -(minutesLeft * 60) -secPassed ;
   timeDisplay.innerText = " ";

    
    secPassed++;
    timeDisplay.innerText = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    document.title = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    if (secondsLeft <= 0) {
        clearInterval(interval);
    }
}

function setTimer(period){
    
    console.log(period);
    if(period == "pomodoro"){
         timeInSec = pomodoro * 60;
    }else if (period == "shortBrake"){
         timeInSec = shortBrake * 60;
    }else {
        timeInSec = longBrake * 60;
    }
    
    minutesLeft =  Math.floor(  (timeInSec - secPassed) / 60 );
    secondsLeft = timeInSec -(minutesLeft * 60) -secPassed ;
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

setTimer(currentPeriod);

////////////////////////////////timer logic///////////////////////////


////////////////////////////taskList logic///////////////////////////////



////////////////////////////taskList logic///////////////////////////////
