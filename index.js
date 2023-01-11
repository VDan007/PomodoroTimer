let timeDisplay = document.querySelector(".timerNumber");
let pomodoro = 0.1;
let pomodoroCounter = 0;
const longBrakeTime = 4;
let shortBrake = 0.1;
let longBrake = 0.1;
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
    if(period == "shortBrake" || period == "longBrake" && !tasksArray == []){
        updateTask(0,tasksArray[0].numberOfPomodoros,tasksArray[0].numberOfCompletedPomodoros + 1);
    }
     
    
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
const taskDonePomodoroNumberInput = document.getElementById("taskDonePomodoroNumberInput");
const taskSettingsDiv = document.getElementById("taskSettings");
const taskSaveBtn = document.getElementById("taskSaveBtn");
const taskCancelBtn =document.getElementById("taskCancelBtn");
const trash = document.getElementById("trash");
const taskList = document.getElementById("taskList");

function updateTask(index, pomodoros, donePomodoros,options){
    let allTasks = taskList.children;
    //console.log(allTasks);
    let taskToBeUpdated = allTasks[index];

    function moveToEnd(){
        taskToBeUpdated.querySelector(".liLeft").classList.add("done")
        createTask(tasksArray[index].taskName,pomodoros,donePomodoros);
        console.log(index);
        taskToBeUpdated.remove();
        const removedTask = tasksArray.splice(index,1);
       
    }
    
    taskToBeUpdated.querySelector(".liRight").querySelector("span").innerText = `${donePomodoros}/${pomodoros}`;
    if(pomodoros == donePomodoros && !options){
        taskToBeUpdated.querySelector(".liLeft").classList.contains("done") ? taskToBeUpdated.querySelector(".liLeft").classList.remove("done") : 
        moveToEnd();
       // createTask(tasksArray[index].taskName,pomodoros,donePomodoros);
      //  taskToBeUpdated.remove();
       // console.log("tasksArray before" + tasksArray);
      //  const removedTask = tasksArray.shift();
      //  console.log("tasksArray afterShift" + tasksArray);
     //   tasksArray.push(removedTask);
      //  console.log("tasksArray afterpush" + tasksArray);
      
    }else if (options){
        
    }else if (!options){
       // console.log('tasks to be updated:' + taskToBeUpdated);
        taskToBeUpdated.getElementsByClassName('liRight')[0].getElementsByTagName('span').textContent =
        `${donePomodoros}/${pomodoros}`;
       // console.log('tasks to be updated:' + taskToBeUpdated.getElementsByTagName("span").innerText);
      //  taskToBeUpdated.getElementsByTagName("span")[0].textContent = `${donePomodoros}/${pomodoros}`;
       tasksArray[index].numberOfCompletedPomodoros = tasksArray[index].numberOfCompletedPomodoros +1;
    }
}

function createTask(name, number,done){

    
        if (!number && !done){
            number = 1;
            done = 0;
        }
        else if (!done) {
            done = 0;
        }

    const svgHttp = 'http://www.w3.org/2000/svg';

    const task = document.createElement('li');
    
    task.classList.add('taskLi');
    task.setAttribute('draggable', 'true');
    task.addEventListener('dragstart',handleDragStart);
    const liLeft = document.createElement('div');
    if(number == done){
        liLeft.classList.add("done");
    }
    liLeft.classList.add('liLeft');
    const checkIcon = document.createElementNS(svgHttp,'svg');
    checkIcon.classList.add('taskOptionsIcon');
    checkIcon.classList.add('checkIcon');
    checkIcon.setAttribute('viewBox','0 0 512 512');
    checkIcon.addEventListener("click",checkTask)
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
    taskSettingsIcon.classList.add('taskSettingsIcon');
    taskSettingsIcon.setAttribute('viewBox','0 0 128 512');
    const path02 = document.createElementNS(svgHttp,'path');
    path02.setAttribute('d','M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z');
    

    checkIcon.appendChild(path01);
    liLeft.appendChild(checkIcon);
    liLeft.appendChild(liLeftText);
    task.appendChild(liLeft);
   
    taskSettingsIcon.appendChild(path02);
    taskSettingsIcon.addEventListener('click',modifyTask) //////////here//////////
    liRight.appendChild(liRightSpan);
    liRight.appendChild(taskSettingsIcon);
    task.appendChild(liRight);

    taskList.appendChild(task);

    taskNameInput.value = '';
    taskPomodoroNumberInput.value = '';
    taskDonePomodoroNumberInput.value = '';

    tasksArray.push({taskName : name,
                    numberOfPomodoros : number ,
                    numberOfCompletedPomodoros: done,
                    })

    

    

    readyDrag();
}

function createTaskOnSaveBtn(){
    createTask(taskNameInput.value,taskPomodoroNumberInput.value,taskDonePomodoroNumberInput.value);
}

function updateTaskOnSaveBtn(){

}

taskSaveBtn.addEventListener('click',createTaskOnSaveBtn);

taskCancelBtn.addEventListener('click',()=> {
    taskSettingsDiv.classList.add('hideClass');
    addTaskBtn.classList.remove('hideClass');
 })

 trash.addEventListener('click',()=> {
    taskSettingsDiv.classList.add('hideClass');
    addTaskBtn.classList.remove('hideClass');
 })

addTaskBtn.addEventListener('click',()=> {
    taskSettingsDiv.classList.remove('hideClass');
    taskNameInput.value = '';
    taskPomodoroNumberInput.value = '';

    addTaskBtn.classList.add('hideClass');
})


function findingTask(e){
    let allTasks = taskList.children;
    let taskLi = e.target.closest('li');    
    let indexOfTask = Array.from(allTasks).indexOf(taskLi);
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

        document.querySelectorAll(".taskSettingsIcon").forEach(
            el => {el.addEventListener("click", modifyTask); }
        );

  }

  function checkTask(e){
    const index = findingTask(e)
    const pomodoros = tasksArray[index].numberOfPomodoros;
    updateTask(index,pomodoros,pomodoros);

    
  }

  function modifyTask(e){
    const task = findingTask(e);
    taskSettingsDiv.classList.remove('hideClass');
    taskNameInput.value = tasksArray[task].taskName;
    taskPomodoroNumberInput.value = tasksArray[task].numberOfPomodoros;
    taskSaveBtn.removeEventListener('click',createTaskOnSaveBtn);
    taskSaveBtn.addEventListener('click',updateTaskOnSaveBtn)
  }

////////////////////////////drag & drop ///////////////////////////////




////////////////////////////taskList logic///////////////////////////////


function test(){
    createTask("alma");
    createTask("vacsi",3,1);
    createTask("almafa",2,1);


}