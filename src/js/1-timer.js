import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates);
  },
};

flatpickr(dateTime, options);

startBtn.addEventListener('click', () => {
  handleStartBtnClick();
});

function handleDateSelection(selectedDates) {
  if (selectedDates[0] < Date.now()) {
    startBtn.disabled = true;
    iziToast.show({
      title: 'Error',
      message: 'Please choose a date in the future',
      color: 'red',
      position: 'topRight',
    });
    return;
  } else {
    userSelectedDate = selectedDates[0];
    startBtn.disabled = false;
  }
}

function handleStartBtnClick() {
  startBtn.disabled = true;
  dateTime.disabled = true;

  timerId = setInterval(() => {
    const time = userSelectedDate - Date.now();

    if (time < 0) {
      clearInterval(timerId);
      dateTime.disabled = false;
      return;
    }

    updateClockFace(time);
  }, 1000);
}

function updateClockFace(time) {
  const { days, hours, minutes, seconds } = convertMs(time);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.toString().padStart(2, '0');
}
