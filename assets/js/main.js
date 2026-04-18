// Main Entry Point
import { initNavigation } from './modules/navigation.js';
import { initTimer, stopTimer, isTimerActive } from './modules/timer.js';
import { initNotifications } from './modules/notifications.js';

document.addEventListener('DOMContentLoaded', () => {
    initNotifications();
    initTimer();
    initNavigation(() => stopTimer(), isTimerActive);
});
