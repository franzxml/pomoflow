// Notification Module
const customNotif = document.getElementById('custom-notif');
const notifMessage = document.getElementById('notif-message');
const closeNotifBtn = document.getElementById('closeNotifBtn');

export function initNotifications() {
    closeNotifBtn.addEventListener('click', () => {
        customNotif.style.display = 'none';
    });

    // Request permission on init
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }
}

export function showNotification(message) {
    // 1. UI Notification
    notifMessage.textContent = message;
    customNotif.style.display = "flex";

    // 2. System Notification
    if ("Notification" in window && Notification.permission === "granted") {
        const emojiIcon = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔔</text></svg>`;
        new Notification("Pomoflow", { body: message, icon: emojiIcon });
    }
}
