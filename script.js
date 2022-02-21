const area= document.getElementById('area');
let move = 0;
result='';
const contentWrapper=document.querySelector('.content');
const mov = document.querySelector('.move');
const modalResult=document.querySelector('.model-result');
const overlay=document.querySelector('.overlay');
const btnClose=document.querySelector('.btn-close');
const boxes = document.querySelectorAll('.box');
const table=document.querySelector('.table')
const audio = new Audio();
area.addEventListener('click', handler);
function handler(event){
  if(event.target.classList.contains('box')){
    if(event.target.innerHTML===''){
      if(move % 2 === 0){
        event.target.innerHTML='X'
        audio.src = `./assets/audio/tic.mp3`;
        audio.play();
      }else{
        event.target.innerHTML='0';
        audio.src = `./assets/audio/tac.mp3`;
        audio.play();
      }
      move++;
      check();
    }      
  }
}

const check = () => {
  const arr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  if(move<9){
    for (i=0; i<arr.length; i++){
      if(boxes[arr[i][0]].innerHTML=='X' && 
        boxes[arr[i][1]].innerHTML=='X' && 
        boxes[arr[i][2]].innerHTML=='X'){
          result='Крестик';
          prepareResult(result);
      }else if(boxes[arr[i][0]].innerHTML=='0' && 
      boxes[arr[i][1]].innerHTML=='0' && 
      boxes[arr[i][2]].innerHTML=='0'){
          result='Нолик';
          prepareResult(result);
      }
    }
  }else{
    result='Никто не';
    prepareResult(result);
  }
  
}
let local=[];
function win(){
  local.unshift(whoWin);
  localStorage.setItem(local, JSON.stringify(local));
  local = JSON.parse(localStorage.getItem("local"));
  console.log(typeof local);
}

const prepareResult = winner =>{
    contentWrapper.innerHTML=`${winner} победил`;
    mov.innerHTML=`Количество шагов: ${move}`  
    modalResult.style.display='block';
    audio.src = `./assets/audio/over.mp3`;
    audio.play();
    whoWin = contentWrapper.innerText;
    win();
    area.removeEventListener('click', handler);
} 

const closeModal = () =>{
  modalResult.style.display='none';
  location.reload();
}
overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal)