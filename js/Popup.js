// imported items
import EventsDataRaw from '../Data/Events-Data.json' assert {type: 'json'};

// lopper functions running
setInterval(setClock, 1000)
setInterval(displayTime, 10);



// Varibeles
let links = document.querySelectorAll("[data-link]"),
panel = document.querySelectorAll(".panel")


const EventsData=JSON.parse(JSON.stringify(EventsDataRaw));
var EventsBody = document.getElementById("EventsDiv")
var EventElement = document.createElement('div')
EventElement.classList.add("Event")

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
const TimeSpan = document.getElementById('TimeSpan')
var date=new Date();


let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;

// Functions

function displayTime(){
  var dateTime = new Date();
  var hrs = dateTime.getHours();
  var min = dateTime.getMinutes();
  var sec = dateTime.getSeconds();
  var session = document.getElementById('session');

  if(hrs >= 12){
      session.innerHTML = 'PM';
  }else{
      session.innerHTML = 'AM';
  }

  if(hrs > 12){
      hrs = hrs - 12;
  }

  document.getElementById('hours').innerText = hrs;
  document.getElementById('minutes').innerText = min;
  document.getElementById('seconds').innerText = sec;
}
function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}
function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation',rotationRatio * 360)
}
function TimeSpanFunc(){
  let output = ""
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  output = date.toLocaleDateString("en-US", options)

  return output
}
const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  } 
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});


function EventsElements(){
  if(EventsData.E1){
    EventsBody.appendChild(EventElement);
    EventElement.innerHTML = `
    <div class=" Event">
      <img src="${EventsData.E1.EventImgLink}" class="EventImg">
      <h1 class=" EventTitle">
        ${EventsData.E1.EventTitle}
      </h1> 
      <p class="EventDiscription">
        ${EventsData.E1.EventDescription}
      </p>
      <p class="EventCountDownTimer">
      Remaining Time:<br>     <span id="EventCountDownTimer"></span>
      </p>
      <button class="EventLMBtn"onclick="window.open('${EventsData.E1.LearnMoreLink}')">
        <span class="material-symbols-rounded">info</span> Learn More
      </button>

    </div>`
  }
}

function displayTimer(){
  milliseconds+=10;
  if(milliseconds == 1000){
      milliseconds = 0;
      seconds++;
      if(seconds == 60){
          seconds = 0;
          minutes++;
          if(minutes == 60){
              minutes = 0;
              hours++;
          }
      }
  }
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

  timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}
function CountDownTimer(dt, id,Wd){
  var end = new Date(dt);
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var timer;
  function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById(id).innerHTML += Wd;
      return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);
    document.getElementById(id).innerHTML = days + ' Days ';
    document.getElementById(id).innerHTML += hours + ' Hours ';
    document.getElementById(id).innerHTML += minutes + ' Mins ';
    document.getElementById(id).innerHTML += seconds + 'S';
  }
  timer = setInterval(showRemaining, 1000);
}


// Fuctions Running

document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer,10);
});

document.getElementById('pauseTimer').addEventListener('click', ()=>{
    clearInterval(int);
});

document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    timerRef.innerHTML = '00 : 00 : 00 : 000 ';
});




setClock()

TimeSpan.innerHTML = TimeSpanFunc()

for(let i = 0; i < links.length; i++) {
  links[i].addEventListener("click", () => {
    for(let j = 0; j < panel.length; j++) {
      panel[j].classList.remove("active")
    }
    document.querySelector(`#${event.currentTarget.getAttribute("data-link")}`).classList.toggle("active")
  })
}
renderCalendar(); 

CountDownTimer(EventsData.E1.EventTime,"EventCountDownTimer",EventsData.E1.EventsCelebration)

EventsElements()

