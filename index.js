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

const tasksArray = [];




const addTaskBtn = document.getElementById("addTaskBtn");
const taskNameInput = document.getElementById("taskNameInput");
const taskPomodoroNumberInput = document.getElementById("taskPomodoroNumberInput");
const taskSettingsDiv = document.getElementById("taskSettings");
const taskSaveBtn = document.getElementById("taskSaveBtn");
const taskCancelBtn =document.getElementById("taskCancelBtn");
const taskList = document.getElementById("taskList");

function createTask(name, number){

    if(name ){ 
        if (!number){
            number = 1;
        }

    const svgHttp = 'http://www.w3.org/2000/svg';

    const task = document.createElement('li');
    const liLeft = document.createElement('div');
    liLeft.classList.add('liLeft');
    const checkIcon = document.createElementNS(svgHttp,'svg');
    checkIcon.classList.add('taskOptionsIcon');
    checkIcon.setAttribute('viewBox','0 0 512 512');
    const path01 = document.createElementNS(svgHttp,'path');
    path01.setAttribute('d','M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z');
    const liLeftText = document.createElement('p');
    liLeftText.textContent = name;
    const liRight = document.createElement('div');
    liRight.classList.add('liRight');
    const liRightSpan = document.createElement('span');
    liRightSpan.textContent = `0/${number}`;
    const taskSettingsIcon = document.createElementNS(svgHttp,'svg');
    taskSettingsIcon.classList.add('taskOptionsIcon');
    taskSettingsIcon.setAttribute('viewBox','0 0 128 512');
    const path02 = document.createElementNS(svgHttp,'path');
    path02.setAttribute('d','M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z');
    

    checkIcon.appendChild(path01);
    liLeft.appendChild(checkIcon);
    liLeft.appendChild(liLeftText);
    task.appendChild(liLeft);
   
    taskSettingsIcon.appendChild(path02);
    liRight.appendChild(liRightSpan);
    liRight.appendChild(taskSettingsIcon);
    task.appendChild(liRight);

    taskList.appendChild(task);

    taskNameInput.value = '';
    taskPomodoroNumberInput.value = '';

    tasksArray.push({"taskName" : name,
                    "numberOfPomodoros" : number })

    }


}

taskSaveBtn.addEventListener('click',() => {
    createTask(taskNameInput.value,taskPomodoroNumberInput.value);
    

});

taskCancelBtn.addEventListener('click',()=> {
    taskSettingsDiv.classList.add('hideClass');
    addTaskBtn.classList.remove('hideClass');
 })

addTaskBtn.addEventListener('click',()=> {
    taskSettingsDiv.classList.remove('hideClass');
    addTaskBtn.classList.add('hideClass');
})

////////////////////////////taskList logic///////////////////////////////
