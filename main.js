let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = Date.now() - difference;
        timerInterval = setInterval(updateDisplay, 1000 / 60);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(timerInterval);
        difference = Date.now() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps = [];
    updateLaps();
}

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let milliseconds = Math.floor(date.getUTCMilliseconds() / 10);
    return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 2)}`;
}

function pad(number, digits) {
    return number.toString().padStart(digits, '0');
}

function recordLap() {
    if (running) {
        laps.push(formatTime(updatedTime));
        updateLaps();
    }
}

function updateLaps() {
    lapsList.innerHTML = laps.map((lap, index) => `<li><span>Lap ${index + 1}</span>${lap}</li>`).join('');
}
