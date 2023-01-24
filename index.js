const myWorker = new Worker("worker.js");
let timeDisplay = document.querySelector(".timerNumber");
let pomodoro = 25;
let pomodoroCounter = 0;
let longBrakeTime = 4;
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
const themes = document.getElementById("themes");
const sounds = document.getElementById("sounds");
sounds.addEventListener("click",()=>{sounds.value = "";});
sounds.addEventListener("input",soundSelect);
themes.addEventListener("click",()=>{themes.value = "";});
themes.addEventListener("input",themeSelect);
themesList = document.getElementById("themesDatalist");
let deliberetlyStarted = false;
let tasksArray = [];
let done = false;
const settingsBtn = document.getElementById("settingsIconDiv");
settingsBtn.addEventListener("click",settingsToggle);

const settingContainerClose = document.querySelector(".settingContainerClose");
const sound = document.querySelector("#audio");
sound.autoplay = false;


/////////////Worker///////////////////////////

function start(){
    myWorker.postMessage('start');
}

function stop(){
    myWorker.postMessage('terminate');
}




myWorker.onmessage = function(e) {
    console.log( "worker posted " + e.data);
    secPassed = e.data;
    moveTimer();
   // test();
    
}




/////////////Worker///////////////////////////


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

//////////////////////////settings//////////////////////////
const settingsInputPomodoro = document.getElementById("settingsInputPomodoro");
settingsInputPomodoro.value = pomodoro;
const settingInputShortBreak =document.getElementById("settingInputShortBreak");
settingInputShortBreak.value = shortBrake;
const settingsInputLongBreak = document.getElementById("settingsInputLongBreak");
settingsInputLongBreak.value = longBrake;
const inputToggleASTimer = document.getElementById("inputToggleASTimer");
inputToggleASTimer.checked = autoSwitch;
const settingsLongBreakInterval = document.getElementById("settingsLongBreakInterval");
settingsLongBreakInterval.value = longBrakeTime;
let alarmRepeat = 1;
const repeatTime =document.getElementById("repeatTime");
repeatTime.addEventListener("input",setRepeat);

document.querySelectorAll(".timerInput").forEach(
    (input) => {input.addEventListener("input",updateValue)}
);

function updateValue(e){
    let input = e.target;
    if(input.id == "settingsInputPomodoro"){
        pomodoro = input.value;
    }
    if(input.id == "settingInputShortBreak"){
        shortBrake = input.value;
    }
    if(input.id == "settingsInputLongBreak"){
        longBrake = input.value;
    }
    if(input.id == "inputToggleASTimer" ){
        autoSwitch = input.checked ? true: false;
    }
    if(input.id == "settingsLongBreakInterval"){
        longBrakeTime = input.value;
    }
    setTimer(currentPeriod);
}



function settingsToggle(e){
    const volume = document.getElementById("volume");
    volume.addEventListener('input',setVolume);
    const settingsContainer = document.querySelector(".settingsContainer")
    const settingsDiv = document.getElementById("settingsDiv");
    sound.load();
    
    
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

function themeSelect(){
    
    const root = document .querySelector(":root");
    if(themes.value == "Default Apple"){
        root.style.setProperty('--bgColor','linear-gradient(45deg,#4CAF50,#81C784)');
        root.style.setProperty('--textColor','#FFFFFF');
        root.style.setProperty('--borderColor','#388E3C');
        
    }
    if(themes.value == "Borg"){
        root.style.setProperty('--bgColor','linear-gradient(45deg,#0A0A0A,#2C2C2C)');
        root.style.setProperty('--textColor','#FFFFFF');
        root.style.setProperty('--borderColor','#00FF00');
        
    }
    if(themes.value == "Pinky"){
        root.style.setProperty('--bgColor','radial-gradient(#FF4D80,#F8F8FF)');
        root.style.setProperty('--textColor','#465362');
        root.style.setProperty('--borderColor','#011936');
        
    }
    if(themes.value == "Dawn"){
        root.style.setProperty('--bgColor','radial-gradient(#F9A42A,#C94277)');
        root.style.setProperty('--textColor','#C7FFED');
        root.style.setProperty('--borderColor','#AAFAC8');
        
    }
    if(themes.value == "Honey"){
        root.style.setProperty('--bgColor','linear-gradient(45deg,#FFEB3B,#FFF59D)');
        root.style.setProperty('--textColor','#424242');
        root.style.setProperty('--borderColor','#F57F17');
        
    }
    if(themes.value == "Purposeful Purple"){
        root.style.setProperty('--bgColor','radial-gradient(#E1BEE7,#9C27B0)');
        root.style.setProperty('--textColor','#FFFFFF');
        root.style.setProperty('--borderColor','#4A148C');
        
    }
    if(themes.value == "Rapid Red"){
        root.style.setProperty('--bgColor','radial-gradient(#EF9A9A,#F44336)');
        root.style.setProperty('--textColor','#FFFFFF');
        root.style.setProperty('--borderColor','#B71C1C');
        
    }
    if(themes.value == "Mustard Menace"){
        root.style.setProperty('--bgColor','linear-gradient(35deg,#303030,#ffff00)');
        root.style.setProperty('--textColor','#000');
        root.style.setProperty('--borderColor','#ffff00');
        
    }
    if(themes.value == "Dark Star"){
        root.style.setProperty('--bgColor','radial-gradient(#000000,#000080,#ff0000)');
        root.style.setProperty('--textColor','#FFFFFF');
        root.style.setProperty('--borderColor','#ff0000');
       
    }
    if(themes.value == "Ice Cold"){
        root.style.setProperty('--bgColor','radial-gradient(#00008b,#87cefa,#00008b)');
        root.style.setProperty('--textColor','#FFFFFF');
        root.style.setProperty('--borderColor','#87cefa');
        
    }
    if(themes.value == "Villainy Orange"){
        root.style.setProperty('--bgColor','linear-gradient(45deg,#242022,#080908)');
        root.style.setProperty('--textColor','#B45623');
        root.style.setProperty('--borderColor','#8A2920');
        
    }
    if(themes.value == "Darth Pinky"){
        root.style.setProperty('--bgColor','linear-gradient(35deg,#1C2331,#EA638C,#1C2331)');
        root.style.setProperty('--textColor','#ECF0F1');
        root.style.setProperty('--borderColor','#2C3E50');
        
    }
    if(themes.value == "Dark Knight"){
        root.style.setProperty('--bgColor','radial-gradient(#3a3a3a,#000000)');
        root.style.setProperty('--textColor','#ffffff');
        root.style.setProperty('--borderColor','#545454');
        
    }
}

function soundSelect(){
    if(sounds.value == "Alarm"){
        sound.setAttribute("src","./sounds/alarm.mp3");
        sound.load();
        sound.play();
    }
    if(sounds.value == "Attention"){
        sound.setAttribute("src","./sounds/call-to-attention-123107.mp3");
        sound.load();
        sound.play();
    }
    if(sounds.value == "Explosion"){
        sound.setAttribute("src","./sounds/explosion.mp3");
        sound.load();
        sound.play();
    }
    if(sounds.value == "Vocal"){
        sound.setAttribute("src","./sounds/sisters-voices-103432.mp3");
        sound.load();
        sound.play();
    }
   
    
}

function setRepeat(){
    alarmRepeat = repeatTime.value ;
}



function repeat(){
    let timesPlayed = 0;
    
    sound.addEventListener('ended', ()=>{
        timesPlayed++;
        if(timesPlayed < alarmRepeat){
            sound.play();
        }
    })
    sound.play();
}

function setVolume(){
    sound.volume = volume.value;
}

//////////////////////////settings//////////////////////////

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
        stop();
        startButton.innerText = "Start";
        areWeCounting = false;
        deliberetlyStarted = false;
        
    }else{ 
     start();
     startButton.innerText = "Pause";
     areWeCounting = true;
     deliberetlyStarted = true;
    }

     
}



function moveTimer (){
   console.log("move timer invoked");
  // secPassed++;
   minutesLeft =  Math.floor(  (timeInSec - secPassed) / 60 );
    secondsLeft = timeInSec -(minutesLeft * 60) -secPassed ;
   timeDisplay.innerText = " ";
    timeDisplay.innerText = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    document.title = `${minutesLeft < 10 ? "0"+minutesLeft : minutesLeft}:${secondsLeft < 10 ? "0"+secondsLeft : secondsLeft}`;
    if (timeInSec <= secPassed) {
        if(autoSwitch ){
            repeat();
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
            console.log('shoundPLay');
            repeat();
            startButton.innerText = "Restart";
            startButton.removeEventListener("click",startStopTimer);
            startButton.addEventListener("click",reSetTimer);
            if(currentPeriod == "pomodoro" && tasksArray.length != 0){
                updateTask(0,tasksArray[0].numberOfPomodoros,parseInt(tasksArray[0].numberOfCompletedPomodoros) +1);
            }


        }

        
    }
    
}

function reSetTimer(){
    areWeCounting = false;
    secPassed = 0;
    setTimer("pomodoro");
    startStopTimer();
    startButton.removeEventListener("click",reSetTimer);
    startButton.addEventListener("click",startStopTimer);
}

function setTimer(period){
    
    
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
    stop();
    currentPeriod = period;
    areWeCounting = false;
    secPassed = 0;
    setTimer(currentPeriod);
    periodButtonSwitch();
    startButton.innerText = "Start";
    
     
    
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
    countPomodoros();
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
    
}

function trashBtnClick(){
    taskSettingsDiv.classList.add('hideClass');
    addTaskBtn.classList.remove('hideClass');
}

//taskSaveBtn.addEventListener('click',createTaskOnSaveBtn);

taskCancelBtn.addEventListener('click',()=> {
    taskSettingsDiv.classList.add('hideClass');
    addTaskBtn.classList.remove('hideClass');
    document.getElementById("trash").classList.add('hideClass');
    
 })

 trashBtn.addEventListener('click',trashBtnClick);

addTaskBtn.addEventListener('click',()=> {
    
    taskSettingsDiv.classList.remove('hideClass');
    taskNameInput.value = '';
    taskPomodoroNumberInput.value = '';
    taskDonePomodoroNumberInput.value = '';

    let toBeCloned = document.getElementById("taskSaveBtn");
    let cloneSaveBtn = toBeCloned.cloneNode(true);
    toBeCloned.remove();
    document.querySelector(".taskSettingsBtnDiv").prepend(cloneSaveBtn);


    cloneSaveBtn.addEventListener('click',createTaskOnSaveBtn);
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

    addTaskBtn.classList.add("hideClass");
    const task = findingTask(e);
    taskSettingsDiv.classList.remove('hideClass');
    taskNameInput.value = tasksArray[task].taskName;
    taskPomodoroNumberInput.value = tasksArray[task].numberOfPomodoros;
    taskDonePomodoroNumberInput.value = tasksArray[task].numberOfCompletedPomodoros;
    document.getElementById("taskSaveBtn").removeEventListener('click',createTaskOnSaveBtn);

    
    let toBeCloned = document.getElementById("trash");
    let cloneTrash = toBeCloned.cloneNode(true);
    toBeCloned.remove();
    document.querySelector(".taskSettingsBtnDiv02").appendChild(cloneTrash);

    cloneTrash.addEventListener('click',()=>{deleteTask(task)
                                            addTaskBtn.classList.remove("hideClass");
                                            cloneTrash.classList.add("hideClass")},{once:true});
    cloneTrash.classList.remove("hideClass");
    
    

 

     document.getElementById("taskSaveBtn").addEventListener('click',()=>{updateTask(task,taskPomodoroNumberInput.value,taskDonePomodoroNumberInput.value,true)
                                                                         cloneTrash.classList.add('hideClass')},{once: true});
    
    
    
    
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
        
       // if(pomodoros  == pomodorosDone){
       //     done = true;
       // }
        pomodoros == pomodorosDone ? done = true : done = false;
        if(!done){
            putUnfinishedTaskFirst();
        }
    }else{
        progressbar.classList.add("hideClass");
    }

    
   
}


////////////////////////////progress bar///////////////////////////////


////////////////////////////Music///////////////////////////////
const musicContainer = document.getElementById("musicContainer");
const muiscBtn = document.getElementById("muiscBtn");
muiscBtn.addEventListener("click",toggleMusicDiv);

const musicTypeSelectBtns = document.querySelectorAll(".musicTypeSelectBtn");
musicTypeSelectBtns.forEach(
    (btn) => {btn.addEventListener("click",loadMusic);}
);

function toggleMusicDiv (){
    let frame = musicContainer.querySelector("#spotifyFrame");
    console.log(frame);

    if(musicContainer.classList.contains("hideClass")){
        musicContainer.classList.remove("hideClass");
        
    }else{
       
        musicContainer.classList.add("hideClass");
        if(frame){
            frame.remove();
        }
    }
}

function loadMusic(e){
    let prevFrame = musicContainer.querySelector("#spotifyFrame");
    if(prevFrame){
        prevFrame.remove();
    }
   
    let button =e.target.id;
    console.log('clicked');
    let frame = document.createElement("iframe");
    frame.setAttribute("id","spotifyFrame");
    frame.setAttribute("loading","lazy");
    frame.setAttribute("allow","autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture");
    frame.setAttribute("width","100%");
    frame.setAttribute("height","250");
    frame.setAttribute("frameBorder","0");
    if(button == "metalBtn"){ 
        frame.setAttribute(
                "src","https://open.spotify.com/embed/artist/0QQpya0rYaN3prGBCQczRZ?utm_source=generator");
        musicContainer.append(frame);
    }
    if(button == "studyBtn"){ 
        frame.setAttribute(
                "src","https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator");
        musicContainer.append(frame);
    }
    if(button == "chillBtn"){ 
        frame.setAttribute(
                "src","https://open.spotify.com/embed/playlist/0AIovh0Qq1sUP7YfhxTDhw?utm_source=generator");
        musicContainer.append(frame);
    }
    if(button == "pianoBtn"){ 
        frame.setAttribute(
                "src","https://open.spotify.com/embed/playlist/5JAgYZVe3O7iMa4HZ2X63D?utm_source=generator");
        musicContainer.append(frame);
    }
}     
      
    
    



////////////////////////////Music///////////////////////////////

function test(){
    createTask("alma");
    createTask("vacsi",3,1);
    createTask("almafa",2,1);
    createTask("test007",8,3);


}