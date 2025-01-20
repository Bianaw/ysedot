
import { updateNotificationCount, displayNotifications, addNotification } from './notifications';

describe("בדיקות עבור ניהול הודעות", () => {
    let notifications;
    let mockNotificationCount;
    let mockNotificationDropdown;

    beforeEach(() => {
        notifications = [];
        mockNotificationCount = { style: { display: "" }, textContent: "" };
        mockNotificationDropdown = { innerHTML: "" };
    });

    test("updateNotificationCount מעדכן תצוגת כמות הודעות", () => {
        notifications.push("הודעה חדשה");
        updateNotificationCount(notifications, mockNotificationCount);
        expect(mockNotificationCount.style.display).toBe("block");
        expect(mockNotificationCount.textContent).toBe(1);


        notifications.pop();
        updateNotificationCount(notifications, mockNotificationCount);
        expect(mockNotificationCount.style.display).toBe("none");
    });

    test("displayNotifications מציג הודעות בתפריט", () => {
        notifications.push("הודעה חדשה");
        displayNotifications(notifications, mockNotificationDropdown);
        expect(mockNotificationDropdown.innerHTML).toBe("<p>הודעה חדשה</p>");

        notifications = [];
        displayNotifications(notifications, mockNotificationDropdown);
        expect(mockNotificationDropdown.innerHTML).toBe("<p>אין הודעות חדשות</p>");
    });

    test("addNotification מוסיף הודעה לרשימה", () => {
        addNotification(notifications, "הודעה חדשה");
        expect(notifications.length).toBe(1);
        expect(notifications[0]).toBe("הודעה חדשה");
    });
});
