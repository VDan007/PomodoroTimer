let timeDisplay = document.querySelector(".timerNumber");
let pomodoro = 25;
let pomodoroCounter = 0;
const longBrakeTime = 4;
let shortBrake = 5;
let longBrake = 15;
let secPassed = 0;
let minutesLeft ;
let secondsLeft;
let timeInSec;
let interval;
let areWeCounting = false;
let currentPeriod = "pomodoro";
let autoSwitch = true;
let deliberetlyStarted = false;

const startButton = document.getElementById("start");
startButton.addEventListener("click",startStopTimer);

const pomodoroButton = document.getElementById("pomodoroBtn");
//pomodoroButton.addEventListener("click",(e) => classListModifier(e));
pomodoroButton.addEventListener("click",() => periodShift("pomodoro"));

const shortBrakeButton = document.getElementById("shortBrakeBtn");
//shortBrakeButton.addEventListener("click",(e) => classListModifier(e));
shortBrakeButton.addEventListener("click",() => periodShift("shortBrake"));


const longBrakeButton = document.getElementById("longBrakeBtn");
//longBrakeButton.addEventListener("click",(e) => classListModifier(e));
longBrakeButton.addEventListener("click",() => periodShift("longBrake"));






function periodButtonSwitch(){
    const periodBtns =  document.querySelectorAll(".periodBtn");
    periodBtns.forEach(el => el.addEventListener('click',() => {deliberetlyStarted = false;}))
    periodBtns.forEach(el => el.classList.remove("currentPeriod"));
    if(currentPeriod == "pomodoro"){
        pomodoroButton.classList.add("currentPeriod");
    }else if (currentPeriod == "shortBrake"){
        shortBrakeButton.classList.add("currentPeriod");
    }else {
        longBrakeButton.classList.add("currentPeriod");
    }
}




////////////////////////////////timer logic///////////////////////////
function startStopTimer(){
    if(areWeCounting){
        clearInterval(interval);
        startButton.innerText = "Start";
        areWeCounting = false;
        deliberetlyStarted = false;
        
    }else{ 
     interval = setInterval( moveTimer, 1000);
     startButton.innerText = "Pause";
     areWeCounting = true;
     deliberetlyStarted = true;
    }

     
}



function moveTimer (){

   secPassed++;
   minutesLeft =  Math.floor(  (timeInSec - secPassed) / 60 );
    secondsLeft = timeInSec -(minutesLeft * 60) -secPassed ;
   timeDisplay.innerText = " ";
    timeDisplay.innerText = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    document.title = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    if (secondsLeft <= 0) {
        if(currentPeriod == "pomodoro"){
            pomodoroCounter++;
            console.log(pomodoroCounter);
        }
        clearInterval(interval);
        if(autoSwitch && longBrakeTime > pomodoroCounter ){
            
            currentPeriod == "pomodoro" ? periodShift("shortBrake") : periodShift("pomodoro");
        } else{
            periodShift("longBrake");
            pomodoroCounter = 0;
        }

        
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
    periodButtonSwitch();
    if(autoSwitch && deliberetlyStarted){
        startStopTimer();
    }
    
    
}

setTimer(currentPeriod);




////////////////////////////////timer logic///////////////////////////









////////////////////////////taskList logic///////////////////////////////

let tasksArray = [];
const addTaskBtn = document.getElementById("addTaskBtn");
const taskNameInput = document.getElementById("taskNameInput");
const taskPomodoroNumberInput = document.getElementById("taskPomodoroNumberInput");
const taskSettingsDiv = document.getElementById("taskSettings");
const taskSaveBtn = document.getElementById("taskSaveBtn");
const taskCancelBtn =document.getElementById("taskCancelBtn");
const taskList = document.getElementById("taskList");

function updateTask(index, pomodoros, donePomodoros){
    let allTasks = taskList.children;
    let taskToBeUpdated = allTasks[index];
    taskToBeUpdated.childNodes[1].childNodes[0].innerText = `${donePomodoros}/${pomodoros}`;
}

function createTask(name, number,done){

    if(name ){ 
        if (!number || !done){
            number = 1;
            done = 0;
        }

    const svgHttp = 'http://www.w3.org/2000/svg';

    const task = document.createElement('li');
    
    task.classList.add('taskLi');
    task.setAttribute('draggable', 'true');
    task.addEventListener('dragstart',handleDragStart);
    const liLeft = document.createElement('div');
    liLeft.classList.add('liLeft');
    const checkIcon = document.createElementNS(svgHttp,'svg');
    checkIcon.classList.add('taskOptionsIcon');
    checkIcon.classList.add('checkIcon');
    checkIcon.setAttribute('viewBox','0 0 512 512');
    checkIcon.addEventListener("click",checkTask)/////////////////////here////////////
    const path01 = document.createElementNS(svgHttp,'path');
    path01.setAttribute('d','M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z');
    const liLeftText = document.createElement('p');
    liLeftText.textContent = name;
    const liRight = document.createElement('div');
    liRight.classList.add('liRight');
    const liRightSpan = document.createElement('span');
    liRightSpan.textContent = `${done}/${number}`;
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

    tasksArray.push({taskName : name,
                    numberOfPomodoros : number ,
                    numberOfCompletedPomodoros: done,
                    })

    }

    readyDrag();
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


function findingTask(e){
    let allTasks = taskList.children;
    let taskLi = e.target.closest('li');    
    let indexOfTask = Array.from(allTasks).indexOf(taskLi);
    console.log("console" + indexOfTask);
    return indexOfTask;
}

////////////////////////////drag & drop ///////////////////////////////
function readyDrag(){ 

    const allTasks = document.querySelectorAll('.taskLi');
    allTasks.forEach( (item) =>{
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragenter', handleDragEnter);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('drop', handleDrop);
    } )

    
}   
    


function handleDragStart(e) {
    this.style.opacity = '0.4';
    console.log('dragstart')
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }
  
  function handleDragEnd(e) {
    this.style.opacity = '1';
    console.log('dragend')
  }
  
  function handleDragOver(e) {
    e.preventDefault();
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }
  function handleDrop(e) {
    e.stopPropagation(); 
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
      this.classList.remove('over');
      rearrangeTasksArray();
      eventListenerAdder();
    return false;
  }

  function rearrangeTasksArray (){
    const newOrder = [];
    for(let i = 0;i <taskList.children.length; i++){
        newOrder.push(taskList.children[i].innerText.match(/^[^\n]+/));

    }
   // console.log(newOrder[0][0].toString());

    let tasksArray02 = [];

    for(let a = 0; a < newOrder.length; a++){
        for(let y = 0; y < tasksArray.length; y ++){
            if(newOrder[a][0] == tasksArray[y].taskName){
                tasksArray02.push(tasksArray[y]);
            }
        }
    }
    tasksArray = tasksArray02;

  }

  function eventListenerAdder(){
    ////drag&drop takes them///////
        document.querySelectorAll(".checkIcon").forEach(
            el => {el.addEventListener("click", checkTask); }
        );

  }

  function checkTask(e){
    const index = findingTask(e)
    tasksArray[index].numberOfCompletedPomodoros = tasksArray[index].numberOfPomodoros;
    
  }

////////////////////////////drag & drop ///////////////////////////////




////////////////////////////taskList logic///////////////////////////////


function test(){
    createTask("alma");
    createTask("vacsi",9,1);
    createTask("almafa",2,1);


}