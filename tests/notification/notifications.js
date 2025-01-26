export function updateNotificationCount(notifications, notificationCountElement) {
    if (notifications.length > 0) {
        notificationCountElement.style.display = "block";
        notificationCountElement.textContent = notifications.length;
    } else {
        notificationCountElement.style.display = "none";
    }
}

export function displayNotifications(notifications, notificationDropdownElement) {
    if (notifications.length === 0) {
        notificationDropdownElement.innerHTML = "<p>אין הודעות חדשות</p>";
    } else {
        notificationDropdownElement.innerHTML = notifications
            .map((msg) => `<p>${msg}</p>`)
            .join("");
    }
}

export function addNotification(notifications, message) {
    notifications.push(message);
}