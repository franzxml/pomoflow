// Main Entry Point
import { initNavigation } from './modules/navigation.js';
import { initTimer } from './modules/timer.js';
import { initNotifications } from './modules/notifications.js';
import { initTheme } from './modules/theme.js';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNotifications();
    initTimer();
    initNavigation();
});
