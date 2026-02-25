// Timer Module
import { showNotification } from './notifications.js';
import { switchView } from './navigation.js';

let timeLeft = 25 * 60;
let initialTime = 25 * 60;
let timerId = null;

const timeDisplay = document.getElementById('time-display');
const timerTitle = document.getElementById('timer-title');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

export function initTimer() {
    const workModeBtn = document.getElementById('workModeBtn');
    const breakModeBtn = document.getElementById('breakModeBtn');
    const customModeBtn = document.getElementById('customModeBtn');
    const startCustomBtn = document.getElementById('startCustomBtn');

    workModeBtn.addEventListener('click', () => setTimerMode(25, 'Kerja'));
    breakModeBtn.addEventListener('click', () => setTimerMode(5, 'Istirahat'));
    
    // Menuju ke setup kustom
    customModeBtn.addEventListener('click', () => {
        switchView('custom', 'forward');
    });

    // Mulai timer kustom
    startCustomBtn.addEventListener('click', () => {
        const mins = parseInt(document.getElementById('customMinutes').value) || 0;
        const secs = parseInt(document.getElementById('customSeconds').value) || 0;
        
        if (mins === 0 && secs === 0) {
            alert("Harap masukkan waktu yang valid!");
            return;
        }

        const totalSeconds = (mins * 60) + secs;
        setTimerMode(totalSeconds / 60, 'Kostum');
    });

    startPauseBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
}

function setTimerMode(minutes, title) {
    timeLeft = Math.round(minutes * 60);
    initialTime = timeLeft;
    timerTitle.textContent = title;
    updateDisplay();
    switchView('timer', 'forward');
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    if (timerId) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    startPauseBtn.textContent = "Jeda";
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            stopTimer();
            showNotification(`Waktu ${timerTitle.textContent} telah selesai!`);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startPauseBtn.textContent = "Mulai";
}

export function stopTimer() {
    pauseTimer();
}

function resetTimer() {
    stopTimer();
    timeLeft = initialTime;
    updateDisplay();
}
