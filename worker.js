let timer = 0;
let myTimer;

onmessage = function(e){
  console.log(e.data);
  if(e.data == "start"){
    myTimer = setInterval(moveTimer,1000);
  }
  else{
    clearInterval(myTimer);
  }
}

function moveTimer() {
  timer++;
  postMessage(timer);
}