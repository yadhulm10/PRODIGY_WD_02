let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10); // Update every 10ms for milliseconds display
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10); // Get milliseconds as whole number

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
    let str = num.toString();
    while (str.length < size) str = '0' + str;
    return str;
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00:00"; // Reset to 000 for milliseconds
    lapList.innerHTML = '';
    lapCounter = 1;
}

function recordLap() {
    if (running) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((difference % 1000) / 10); // Get milliseconds as whole number

        const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter++}: ${lapTime}`;
        lapList.appendChild(li);
    }
}

document.getElementById('startBtn').onclick = startTimer;
document.getElementById('pauseBtn').onclick = pauseTimer;
document.getElementById('resetBtn').onclick = resetTimer;
document.getElementById('lapBtn').onclick = recordLap;

// Particle and floating circle creation functions remain unchanged
