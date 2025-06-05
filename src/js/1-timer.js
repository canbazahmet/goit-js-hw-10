import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const datetimePicker = document.querySelector('#datetime-picker');

const timerValues = document.querySelectorAll('.field');

let userSelectedDate;

const startButton = document.querySelector('button');
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {
      startButton.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: 'rgba(255, 255, 255, 1)',
        messageSize: '16px',
        messageLineHeight: '24px',
        backgroundColor: 'rgba(239, 64, 64, 1)',
        position: 'topCenter',
        timeout: 1500,
      });
    } else {
      startButton.disabled = false;
    }
  },
};

new flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  let startTime = options.defaultDate;
  startButton.disabled = true;
  datetimePicker.disabled = true;
  const timerInterval = setInterval(() => {
    startTime = new Date();
    const elapsedTime = convertMs(userSelectedDate - startTime);
    timerValues[0].children[0].textContent = addLeadingZero(elapsedTime.days);
    timerValues[1].children[0].textContent = addLeadingZero(elapsedTime.hours);
    timerValues[2].children[0].textContent = addLeadingZero(
      elapsedTime.minutes
    );
    timerValues[3].children[0].textContent = addLeadingZero(
      elapsedTime.seconds
    );
    if (userSelectedDate.getTime() - startTime.getTime() < 1000) {
      clearInterval(timerInterval);
      datetimePicker.disabled = false;
    }
  }, 1000);
});
