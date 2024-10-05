// Variables for tracking time and state
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let timerInterval;
let laps = [];

// DOM elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapsList = document.getElementById('laps-list');
const totalLapsElement = document.getElementById('total-laps');
const bestLapElement = document.getElementById('best-lap');
const averageLapElement = document.getElementById('average-lap');

// Function to format time (MM:SS:MS)
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            timeDisplay.textContent = formatTime(elapsedTime);
        }, 10);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.00';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    laps = [];
    lapsList.innerHTML = '';
    updateStatistics();
}

// Add lap time
function addLapTime() {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapElement);
        updateStatistics();
    }
}

// Update statistics
function updateStatistics() {
    totalLapsElement.textContent = laps.length;

    if (laps.length > 0) {
        const bestLapTime = Math.min(...laps);
        const averageLapTime = laps.reduce((a, b) => a + b) / laps.length;

        bestLapElement.textContent = formatTime(bestLapTime);
        averageLapElement.textContent = formatTime(averageLapTime);
    } else {
        bestLapElement.textContent = '00:00:00.00';
        averageLapElement.textContent = '00:00:00.00';
    }
}

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
timeDisplay.addEventListener('click', addLapTime);

// Disable pause button on load
pauseBtn.disabled = true;
