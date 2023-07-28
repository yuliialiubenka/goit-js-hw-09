const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;

const btnWrapper = document.createElement('div');
btnWrapper.classList.add('btn-wrapper');
startBtn.before(btnWrapper);
btnWrapper.append(startBtn, stopBtn);

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

stopBtn.setAttribute('disabled', true);
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function timerForColorChange() {
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function startColorChange() {
    timerForColorChange();

    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);
}

function stopColorChange() {
    clearInterval(timerId);

    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
}
