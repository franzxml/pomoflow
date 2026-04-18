// Timer Module
import { showNotification } from './notifications.js';
import { switchView, getCurrentView } from './navigation.js';

let timeLeft = 25 * 60;
let initialTime = 25 * 60;
let timerId = null;

const timeDisplay = document.getElementById('time-display');
const timerTitle = document.getElementById('timer-title');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const aturUlangBtn = document.getElementById('aturUlangBtn');
const timerIndicator = document.getElementById('timer-indicator');
const indicatorText = document.getElementById('indicator-text');
const confirmModal = document.getElementById('confirm-modal');
const confirmYesBtn = document.getElementById('confirmYesBtn');
const confirmNoBtn = document.getElementById('confirmNoBtn');

let pendingConfirmCallback = null;

export function isTimerActive() {
    return timerId !== null || (timeLeft > 0 && timeLeft < initialTime);
}

function showConfirmModal(onConfirm) {
    pendingConfirmCallback = onConfirm;
    confirmModal.style.display = 'flex';
}

export function initTimer() {
    const workModeBtn = document.getElementById('workModeBtn');
    const breakModeBtn = document.getElementById('breakModeBtn');
    const customModeBtn = document.getElementById('customModeBtn');
    const startCustomBtn = document.getElementById('startCustomBtn');

    confirmYesBtn.addEventListener('click', () => {
        confirmModal.style.display = 'none';
        if (pendingConfirmCallback) {
            pendingConfirmCallback();
            pendingConfirmCallback = null;
        }
    });

    confirmNoBtn.addEventListener('click', () => {
        confirmModal.style.display = 'none';
        pendingConfirmCallback = null;
    });

    workModeBtn.addEventListener('click', () => {
        if (isTimerActive()) {
            showConfirmModal(() => setTimerMode(25, 'Kerja'));
        } else {
            setTimerMode(25, 'Kerja');
        }
    });
    breakModeBtn.addEventListener('click', () => {
        if (isTimerActive()) {
            showConfirmModal(() => setTimerMode(5, 'Istirahat'));
        } else {
            setTimerMode(5, 'Istirahat');
        }
    });
    
    // Menuju ke setup kustom
    customModeBtn.addEventListener('click', () => {
        if (isTimerActive()) {
            showConfirmModal(() => {
                stopTimer();
                switchView('custom', 'forward');
            });
        } else {
            switchView('custom', 'forward');
        }
    });

    // Mulai timer kustom
    startCustomBtn.addEventListener('click', () => {
        const minsInput = document.getElementById('customMinutes');
        const secsInput = document.getElementById('customSeconds');
        const nameInput = document.getElementById('customName');

        const mins = parseInt(minsInput.value) || 0;
        const secs = parseInt(secsInput.value) || 0;
        const customName = nameInput.value.trim();

        if (mins < 0 || secs < 0) {
            alert("Waktu tidak boleh bernilai negatif!");
            return;
        }

        if (secs > 59) {
            alert("Detik tidak boleh lebih dari 59!");
            return;
        }

        if (mins === 0 && secs === 0) {
            alert("Harap masukkan waktu yang valid!");
            return;
        }

        const totalSeconds = (mins * 60) + secs;
        const title = customName || 'Kostum';

        minsInput.value = '';
        secsInput.value = '';
        nameInput.value = '';

        if (isTimerActive()) {
            showConfirmModal(() => setTimerMode(totalSeconds / 60, title));
        } else {
            setTimerMode(totalSeconds / 60, title);
        }
    });

    aturUlangBtn.addEventListener('click', () => switchView('custom', 'forward'));
    timerIndicator.addEventListener('click', () => switchView('timer', 'forward'));

    startPauseBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
}

function setTimerMode(minutes, title) {
    stopTimer();
    timeLeft = Math.round(minutes * 60);
    initialTime = timeLeft;
    timerTitle.textContent = title;
    aturUlangBtn.style.display = 'none';
    timerIndicator.style.display = 'none';
    updateDisplay();
    switchView('timer', 'forward');
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateIndicator() {
    if (getCurrentView() !== 'timer') {
        indicatorText.textContent = `${timerTitle.textContent}: ${timeDisplay.textContent} ▶`;
        timerIndicator.style.display = 'flex';
    } else {
        timerIndicator.style.display = 'none';
    }
}

function toggleTimer() {
    if (timerId) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (timeLeft <= 0) return;
    startPauseBtn.textContent = "Jeda";
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        updateIndicator();
        if (timeLeft <= 0) {
            stopTimer();
            timerIndicator.style.display = 'none';
            aturUlangBtn.style.display = 'block';
            showNotification(`Waktu ${timerTitle.textContent} telah selesai!`);
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startPauseBtn.textContent = "Mulai";
    timerIndicator.style.display = 'none';
}

export function stopTimer() {
    pauseTimer();
}

function resetTimer() {
    stopTimer();
    timeLeft = initialTime;
    aturUlangBtn.style.display = 'none';
    timerIndicator.style.display = 'none';
    updateDisplay();
}
