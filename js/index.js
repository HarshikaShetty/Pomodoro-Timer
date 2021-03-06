//variables for timer functionality*******************************
let mins = document.getElementById("mins");
let secs = document.getElementById("secs");

//set timer values here
let mins_val, secs_val;
let timerControl = document.getElementById("timerControl");
var interID;

//audio for when time's up
let beep = document.querySelector("audio");

//Variables for task list functionality*******************************************
let taskEnteringArea = document.getElementById("taskEnteringArea");
let taskList = document.getElementById("taskList");
let addTaskBtn = document.getElementById("addTaskBtn");
taskEnteringArea.value = "";

//Variables to make data persistant
let idForNewTask = 0;

//Shift between timer types
let switchToPomoBtn = document.getElementById("switchToPomoBtn");
let switchToShortBtn = document.getElementById("switchToShortBtn");
let switchToLongBtn = document.getElementById("switchToLongBtn");

switchToPomoBtn.onclick = function () {
  mins.innerHTML = 25;
};

switchToShortBtn.onclick = function () {
  mins.innerHTML = "05";
};

switchToLongBtn.onclick = function () {
  mins.innerHTML = 15;
};

// Timer funcitonality *******************************************************************
function stopTimer() {
  window.clearInterval(interID);
  timerControl.innerHTML = "START";
  timerControl.onclick = startTimer;
}

function countdown() {
  if (secs_val == 0) {
    if (mins_val == 0) {
      stopTimer();
      beep.play();
      return;
    } else {
      mins_val--;
    }
    mins.innerHTML = mins_val;

    secs_val = 59;
  } else {
    secs_val--;
  }
  secs.innerHTML = secs_val;
}

function startTimer(evt) {
  secs_val = Number(secs.innerHTML);
  mins_val = Number(mins.innerHTML);
  evt.target.onclick = stopTimer;
  evt.target.innerHTML = "STOP";
  interID = window.setInterval(countdown, 1000);
}
timerControl.onclick = startTimer;

// Task adding functionality*********************************************************

function addTaskToList(task, id) {
  let taskTxtNode = document.createTextNode(task);
  let taskEle = document.createElement("li");
  taskEle.id = id;
  let chkBtn = document.createElement("button");
  chkBtn.innerHTML = "Check";

  function unCheckIt(e) {
    taskEle.style.textDecoration = "none";
    e.target.innerHTML = "Check";
    e.target.onclick = checkIt;
  }

  function checkIt(e) {
    taskEle.style.textDecoration = "line-through";
    e.target.innerHTML = "Uncheck";
    e.target.onclick = unCheckIt;
  }

  chkBtn.onclick = checkIt;

  let delBtn = document.createElement("button");
  delBtn.innerHTML = "Delete";

  delBtn.onclick = function () {
    localStorage.removeItem(taskEle.id);
    taskEle.remove();
  };

  taskEle.appendChild(chkBtn);
  taskEle.appendChild(taskTxtNode);
  taskEle.appendChild(delBtn);
  taskList.appendChild(taskEle);
}

addTaskBtn.onclick = function () {
  let task = taskEnteringArea.value.trim();
  if (task == "") {
    return;
  }
  taskEnteringArea.value = "";
  addTaskToList(task, idForNewTask);
  idForNewTask++;
  localStorage.setItem("-1", idForNewTask);
  localStorage.setItem(idForNewTask, task);
};

//When window loads *******************************************************************
window.onload = function () {
  let lSKeys = Object.keys(localStorage);
  lSKeys.sort();
  if (localStorage.getItem("-1")) {
    idForNewTask = Number(localStorage.getItem(lSKeys.shift()));
  }
  lSKeys.forEach(function (key, i) {
    addTaskToList(localStorage.getItem(key), key);
  });
};
