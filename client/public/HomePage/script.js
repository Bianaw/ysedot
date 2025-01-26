
// הצגת הודעה כאשר לוחצים על תפריט
document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      alert(`You clicked on: ${link.textContent}`);
    });
  });
document.addEventListener("DOMContentLoaded", function () {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function () {
            const dropdownContainer = this.parentElement;
            dropdownContainer.classList.toggle("active");
        });
    });

    // סגירת כל התפריטים כאשר לוחצים מחוץ לתיבה
    document.addEventListener("click", function (e) {
        document.querySelectorAll(".dropdown-container").forEach(container => {
            if (!container.contains(e.target)) {
                container.classList.remove("active");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const notificationIcon = document.getElementById("notification-icon");
    const notificationCount = document.getElementById("notification-count");
    const notificationDropdown = document.getElementById("notification-dropdown");

    // רשימת הודעות לדוגמה
    let notifications = [];

    // פונקציה לעדכון מספר ההודעות
    function updateNotificationCount() {
        if (notifications.length > 0) {
            notificationCount.style.display = "block";
            notificationCount.textContent = notifications.length;
        } else {
            notificationCount.style.display = "none";
        }
    }

    // הצגת ההודעות בתפריט
    function displayNotifications() {
        if (notifications.length === 0) {
            notificationDropdown.innerHTML = "<p>אין הודעות חדשות</p>";
        } else {
            notificationDropdown.innerHTML = notifications
                .map((msg) => `<p>${msg}</p>`)
                .join("");
        }
    }

    // הצגת התפריט בלחיצה על הפעמון
    notificationIcon.addEventListener("click", () => {
        notificationDropdown.style.display =
            notificationDropdown.style.display === "block" ? "none" : "block";
        displayNotifications();
    });

    // הוספת הודעה חדשה לדוגמה
    function addNotification(message) {
        notifications.push(message);
        updateNotificationCount();
    }
   //notifications.push("הודעה חדשה");
   // displayNotifications();
   //notifications.length = 0;
   //displayNotifications();
   
    // דוגמא להוספת הודעות
   //addNotification("הודעה חדשה: בקשה שלך אושרה.");
   //addNotification("הודעה חדשה: נשלחה הודעה ממשתמש.");

});


