let timer = 0;
let myTimer;

onmessage = function(e){
  console.log(e.data);
  if(e.data == "start"){
    myTimer = setInterval(moveTimerWorker,1000);
  }
  else if (e.date="terminate"){
    clearInterval(myTimer);
    timer = 0;
  }

  else{
    console.log("else post");
  }
}

function moveTimerWorker() {
  timer++;
  postMessage(timer);
}