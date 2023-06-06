import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
startBtn.disabled = true;

let countdownInterval;

const datePicker = flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose([selectedDate]) {
        if (selectedDate > Date.now()) {
            startBtn.disabled = false;
        } else {
            alert('Please choose a date in the future');
        }
    },
});

startBtn.addEventListener('click', () => {
    const selectedDate = datePicker.selectedDates[0];

    if (!selectedDate) {
        showAlert("Please choose a valid date");
        return;
    }

    startBtn.disabled = true;

    const countdown = () => {
        const currentTime = Date.now();
        const distance = selectedDate.getTime() - currentTime;

        if (distance < 0) {
          clearInterval(countdownInterval);
          showAlert("Timer has ended");
          return;
        }

        const { days, hours, minutes, seconds } = convertMs(distance);

        setElementText(daysEl, days);
        setElementText(hoursEl, hours);
        setElementText(minutesEl, minutes);
        setElementText(secondsEl, seconds);
    };

    countdown();
    countdownInterval = setInterval(countdown, 1000);
});

function setElementText(element, value) {
    element.textContent = addLeadingZero(value);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}


function showAlert(message) {
    Notiflix.Notify.warning(message, {
        position: 'right-bottom',
        timeout: 3000,
    });
}