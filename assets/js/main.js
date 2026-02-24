// Main Entry Point
import { initNavigation } from './modules/navigation.js';
import { initTimer, stopTimer } from './modules/timer.js';
import { initNotifications } from './modules/notifications.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Modules
    initNotifications();
    initTimer();
    
    // Pass callback to navigation to stop timer when going back
    initNavigation(() => {
        stopTimer();
    });
});
