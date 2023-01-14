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
let tasksArray = [];
let done = false;
const settingsBtn = document.getElementById("settingsIconDiv");
settingsBtn.addEventListener("click",settingsToggle);

const settingContainerClose = document.querySelector(".settingContainerClose");



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



function settingsToggle(e){
    const settingsContainer = document.querySelector(".settingsContainer")
    const settingsDiv = document.getElementById("settingsDiv");
    
    
    if(settingsDiv.classList.contains("settings")){
      //  settingsBtn.classList.add("hideClass");
      settingsBtn.style.right = "-530px";
      settingsBtn.style.position = "absolute";

        settingsDiv.classList.remove("settings");
        settingsDiv.classList.add("settingsOpened");
        settingsContainer.style.top = "25px";
      
        

            function outsideClickDetect(e){
                if( !settingsDiv.contains(e.target) || e.target == settingContainerClose){
                    
                    settingsToggle();
                    document.removeEventListener("click",outsideClickDetect);
                    console.log("once")
                }
            }

            document.addEventListener("click",outsideClickDetect);

        outsideClickDetect(e);
        
        
    }else{
     
        
        
        settingsContainer.style.top= "-500px";
        setTimeout(()=>{
            settingsDiv.classList.remove("settingsOpened");
            settingsDiv.classList.add("settings");
          //  settingsBtn.classList.remove("hideClass");
          settingsBtn.style.position = "relative";
            settingsBtn.style.right = "0px";
            
        },700);
    }
}


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
        if(autoSwitch ){
            if(currentPeriod == "pomodoro"){
                pomodoroCounter++;
                if(tasksArray.length != 0){ 
                updateTask(0,tasksArray[0].numberOfPomodoros,parseInt(tasksArray[0].numberOfCompletedPomodoros) +1);
                    if(done){
                        startStopTimer();
                        startButton.innerText = "Restart";
                        startButton.removeEventListener("click",startStopTimer);
                        startButton.addEventListener("click",reSetTimer);
                        return;
                    }
                }

            }
            if(longBrakeTime > pomodoroCounter ){
            
                currentPeriod == "pomodoro" ? periodShift("shortBrake") : periodShift("pomodoro");
            } else{
                periodShift("longBrake");
                pomodoroCounter = 0;
            }
           

        }
       
        else{
            startStopTimer();
            
            startButton.innerText = "Restart";
            startButton.removeEventListener("click",startStopTimer);
            startButton.addEventListener("click",reSetTimer);
            if(currentPeriod == "pomodoro" && tasksArray.length != 0){
                updateTask(0,tasksArray[0].numberOfPomodoros,parseInt(tasksArray[0].numberOfCompletedPomodoros) +1);
            }


        }

        
    }
}

function reSetTimer(period){
    areWeCounting = false;
    secPassed = 0;
    setTimer(period);
    startStopTimer();
    startButton.removeEventListener("click",reSetTimer);
    startButton.addEventListener("click",startStopTimer);
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


let allPomodoros = 0;
const addTaskBtn = document.getElementById("addTaskBtn");
const taskNameInput = document.getElementById("taskNameInput");
const taskPomodoroNumberInput = document.getElementById("taskPomodoroNumberInput");
const taskDonePomodoroNumberInput = document.getElementById("taskDonePomodoroNumberInput");
const taskSettingsDiv = document.getElementById("taskSettings");
const taskSaveBtn = document.getElementById("taskSaveBtn");
const taskCancelBtn =document.getElementById("taskCancelBtn");
const trashBtn = document.getElementById("trash");
const taskList = document.getElementById("taskList");
const progressbar = document.querySelector(".progressBar");
const progress = document.querySelector(".currentStatus");

function updateTask(index, pomodoros, donePomodoros,options){
    let allTasks = taskList.children;
    //console.log(allTasks);
    let taskToBeUpdated = allTasks[index];

    function moveToEnd(){
        taskToBeUpdated.querySelector(".liLeft").classList.add("done")
        createTask(tasksArray[index].taskName,pomodoros,donePomodoros);
        console.log(index);
        taskToBeUpdated.remove();
        tasksArray.splice(index,1);
       
    }
    
    
    if(pomodoros == donePomodoros ){
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
        console.log('whith oprtions run');
       // taskToBeUpdated.querySelector(".liLeft").querySelector(".liLeftText").innerText = taskNameInput.value;
        taskToBeUpdated.querySelector(".liRight").querySelector("span").innerText = `${donePomodoros}/${pomodoros}`;
        //tasksArray[index].taskName = ;
        tasksArray[index].numberOfPomodoros = pomodoros;
        tasksArray[index].numberOfCompletedPomodoros = donePomodoros;
        
        
        console.log(tasksArray);

        
    }else if (!options){
        
        // console.log('tasks to be updated:' + taskToBeUpdated.getElementsByTagName("span").innerText);
        //  taskToBeUpdated.getElementsByTagName("span")[0].textContent = `${donePomodoros}/${pomodoros}`;
         
        taskToBeUpdated.querySelector(".liRight").querySelector("span").innerText = `${donePomodoros}/${pomodoros}`;
        
        tasksArray[index].numberOfCompletedPomodoros = donePomodoros ;
      
        
    }
    countPomodoros()
}

function createTask(name, number,done){
    if(name){ 
    
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
    liLeftText.classList.add("liLeftText");
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

    taskNameInput.value = "";
    taskPomodoroNumberInput.value = "";
    taskDonePomodoroNumberInput.value = "";

    tasksArray.push({taskName : name,
                    numberOfPomodoros : number ,
                    numberOfCompletedPomodoros: done,
                    })

    

    countPomodoros();

    readyDrag();
                }
}

function deleteTask(index){
    let allTasks = taskList.children;
    //console.log(allTasks);
    let taskToBeUpdated = allTasks[index];
    taskToBeUpdated.remove();
    tasksArray.splice(index,1);
    trashBtn.addEventListener('click',trashBtnClick);
    taskSettingsDiv.classList.add('hideClass');
    countPomodoros();
}

function createTaskOnSaveBtn(){
    createTask(taskNameInput.value,taskPomodoroNumberInput.value,taskDonePomodoroNumberInput.value);
    addTaskBtn.classList.remove('hideClass');
}

function trashBtnClick(){
    taskSettingsDiv.classList.add('hideClass');
    addTaskBtn.classList.remove('hideClass');
}

//taskSaveBtn.addEventListener('click',createTaskOnSaveBtn);

taskCancelBtn.addEventListener('click',()=> {
    taskSettingsDiv.classList.add('hideClass');
    addTaskBtn.classList.remove('hideClass');
 })

 trashBtn.addEventListener('click',trashBtnClick);

addTaskBtn.addEventListener('click',()=> {
    taskSettingsDiv.classList.remove('hideClass');
    taskNameInput.value = '';
    taskPomodoroNumberInput.value = '';
    taskDonePomodoroNumberInput.value = '';
    taskSaveBtn.addEventListener('click',createTaskOnSaveBtn);
    if( taskSaveBtn.removeEventListener('click',updateTask)){ 
    taskSaveBtn.removeEventListener('click',updateTask);
    }
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

  ////////////////////////////drag & drop ///////////////////////////////

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
    taskDonePomodoroNumberInput.value = tasksArray[task].numberOfCompletedPomodoros;
    taskSaveBtn.removeEventListener('click',createTaskOnSaveBtn);

    
    trashBtn.removeEventListener('click',trashBtnClick);
    trashBtn.addEventListener('click',()=>{deleteTask(task)},{once:true});
    

 

     taskSaveBtn.addEventListener('click',()=>{updateTask(task,taskPomodoroNumberInput.value,taskDonePomodoroNumberInput.value,true)},{once: true});
    
    
    
    
  }

  function putUnfinishedTaskFirst(){
   
    
    while(tasksArray[0].numberOfPomodoros == tasksArray[0].numberOfCompletedPomodoros){
        let removed = tasksArray.splice(0,1);
            
            tasksArray.splice(tasksArray.length,0,removed[0]);

            taskList.appendChild(taskList.children[0]);
    }

  }

  






////////////////////////////taskList logic///////////////////////////////

////////////////////////////progress bar///////////////////////////////

function countPomodoros (){
    let pomodoros = 0;
    let pomodorosDone = 0;
   
    if(tasksArray.length != 0){
        progressbar.classList.remove("hideClass");
    
        for (let i = 0; i < tasksArray.length; i++){ 
        pomodoros +=  parseInt(tasksArray[i].numberOfPomodoros);
        pomodorosDone += parseInt(tasksArray[i].numberOfCompletedPomodoros);
        }
        console.log("pomodoros: " + pomodoros);
        console.log("pomodorosDone: " + pomodorosDone);
        let percentage = pomodorosDone/pomodoros *100;
        if(percentage > 100){
            percentage = 100;
        }
        progress.style.width = `${percentage}%`;
        
        if(pomodoros  == pomodorosDone){
            done = true;
        }
        if(!done){
            putUnfinishedTaskFirst();
        }
    }else{
        progressbar.classList.add("hideClass");
    }

    
   
}


////////////////////////////progress bar///////////////////////////////



function test(){
    createTask("alma");
    createTask("vacsi",3,1);
    createTask("almafa",2,1);


}