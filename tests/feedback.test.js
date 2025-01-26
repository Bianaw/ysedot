describe("בדיקות עבור טופס משוב", () => {
    let form, notification, notificationMessage, closeNotification;
  
    beforeEach(() => {
        // יצירת אלמנטים עבור הבדיקה
        document.body.innerHTML = `
            <form class="feedback-form">
                <input id="rating" type="number" min="1" max="5"/>
                <textarea id="comments"></textarea>
                <button type="submit">Submit</button>
            </form>
            <div id="notification" style="display:none;">
                <p id="notification-message"></p>
                <button id="close-notification">Close</button>
            </div>
        `;
  
        form = document.querySelector(".feedback-form");
        notification = document.getElementById("notification");
        notificationMessage = document.getElementById("notification-message");
        closeNotification = document.getElementById("close-notification");
    });
  
    test("בודק אם הפידבק מוצג לאחר הגשה תקינה של הטופס", () => {
        // הזנת נתונים
        document.getElementById("rating").value = "5";
        document.getElementById("comments").value = "מעולה";
  
        // הגשת הטופס
        form.dispatchEvent(new Event("submit"));
  
        // Wait for the notification to appear before checking
        setTimeout(() => {
          // בדוק אם ההודעה מוצגת
          expect(notification.style.display).toBe("block");
          expect(notificationMessage.textContent).toBe("Thank you for your feedback with a rating of 5 stars.");
        }, 100); // Adjust this timeout to allow the notification to appear
    });
  
    test("בודק אם הפידבק לא מוצג כאשר שדות החובה ריקים", () => {
        // הזנת נתונים חסרים
        document.getElementById("rating").value = "";
        document.getElementById("comments").value = "";
  
        // הגשת הטופס
        form.dispatchEvent(new Event("submit"));
  
        // בדוק אם קפצה הודעת אזהרה
        expect(notification.style.display).toBe("none");
    });
  
    test("בודק אם ההודעה נסגרת לאחר לחיצה על כפתור הסגירה", () => {
        // הפעלת הודעת הצלחה
        document.getElementById("rating").value = "4";
        document.getElementById("comments").value = "טוב מאוד";
        form.dispatchEvent(new Event("submit"));
  
        // לחיצה על כפתור הסגירה
        closeNotification.dispatchEvent(new Event("click"));
  
        // בדוק אם ההודעה נסגרה
        expect(notification.style.display).toBe("none");
    });
  });
  