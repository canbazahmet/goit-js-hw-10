import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputMs = document.querySelector('input[name="delay"]');
const radioFulfilled = document.querySelector(
  'input[name="state"][value="fulfilled"]'
);
const radioRejected = document.querySelector(
  'input[name="state"][value="rejected"]'
);

form.addEventListener('submit', event => {
  event.preventDefault();
  const makeNewPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioFulfilled.checked) {
        resolve();
      } else if (radioRejected.checked) {
        reject();
      }
    }, inputMs.value);
  });

  makeNewPromise
    .then(() => {
      iziToast.show({
        message: `Fulfilled promise in ${inputMs.value}ms`,
        position: 'topCenter',
        messageColor: 'rgba(255, 255, 255, 1)',
        messageSize: '16px',
        backgroundColor: 'rgba(89, 161, 13, 1)',
        close: false,
        timeout: 1500,
      });
    })
    .catch(() => {
      iziToast.show({
        message: `Rejected promise in ${inputMs.value}ms`,
        position: 'topCenter',
        messageColor: 'rgba(255, 255, 255, 1)',
        messageSize: '16px',
        backgroundColor: 'rgba(181, 27, 27, 1)',
        close: false,
        timeout: 1500,
      });
    });
});
