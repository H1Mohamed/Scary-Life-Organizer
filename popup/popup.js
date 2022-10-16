setInterval(setClock, 1000)
setInterval(displayTime, 10);

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


function EventNotifChecker(EventId,EventNotifToggle,EventTime){
  if(EventsList.find(EventId)===true){
    switch(EventNotifToggle){
      case true:
        const birthday = new Date();
        const date1 = birthday.getDate();

        if(date1 ===EventTime){
          
        };
        break;
      case false:
        return;
    }
  }else{
    return;
  }
}
// Vars

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
const TimeSpan = document.getElementById('TimeSpan')
var date=new Date();

let links = document.querySelectorAll("[data-link]"),
    panel = document.querySelectorAll(".panel")

const EventsList={
  EventHallowen:"evidHalo52574"
}
let event1Notify=true,
    event1Time="31,10"
// Fuctions Running







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


