let timer = 0;
let myTimer;

onmessage = function(e){
  console.log(e.data);
  if(e.data[0] == "start"){
    timer = e.data[1];
    myTimer = setInterval(moveTimerWorker,1000);
  }
  else if (e.data == "terminate"){
    clearInterval(myTimer);
    timer = 0;
  }

  else if(e.data == "pause"){
    clearInterval(myTimer);
  }
}

function moveTimerWorker() {
  timer++;
  postMessage(timer);
}