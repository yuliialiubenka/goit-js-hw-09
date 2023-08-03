import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', true);
stopBtn.setAttribute('disabled', true);
let chosenDate = null;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure("Please choose a date in the future")
            startBtn.setAttribute('disabled', true);
            dateInput.style.borderColor = "red";
        } else {
            chosenDate = selectedDates[0];
    
            startBtn.removeAttribute('disabled');
            startBtn.addEventListener('click', timerOn);
            dateInput.style.borderColor = "#569ff7";
        }
    },
  };

flatpickr('#datetime-picker', options);

function timerOn(){
    timerId = setInterval(() => {
        startBtn.setAttribute('disabled', true);
        dateInput.setAttribute('disabled', true);
        stopBtn.removeAttribute('disabled');
        
        const currentTime = Date.now();
        const deltaTime = chosenDate - currentTime;

        stopBtn.addEventListener('click', () => {
            clearInterval(timerId);
            const { days, hours, minutes, seconds } = convertMs(0);
            updClockInterface({ days, hours, minutes, seconds });
            startBtn.removeAttribute('disabled');
            dateInput.removeAttribute('disabled');
            stopBtn.setAttribute('disabled', true);
        });

        if (deltaTime < 1000) {
            clearInterval(timerId);
            startBtn.setAttribute('disabled', true);
            dateInput.removeAttribute('disabled');
            stopBtn.setAttribute('disabled', true);
        }
 
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        updClockInterface({ days, hours, minutes, seconds });
        
    }, 1000)
}




function updClockInterface({ days, hours, minutes, seconds }) {
    daysElem.textContent = days;
    hoursElem.textContent = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}