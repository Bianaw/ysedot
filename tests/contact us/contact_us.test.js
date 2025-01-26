describe("בדיקות עבור טופס יצירת קשר", () => {
    let form, notification, notificationMessage, closeNotification;
  
    beforeEach(() => {
      document.body.innerHTML = `
        <form id="user-form">
          <label for="recipient">Send To</label>
          <select id="recipient" required>
            <option value="admin">Admin</option>
            <option value="worker">Worker</option>
          </select>
          
          <label for="message">Technical Issue</label>
          <textarea id="message" placeholder="Describe the issue..." required></textarea>
          
          <button type="submit">Send Message</button>
        </form>
        <div id="notification" class="notification"></div>
      `;
  
      form = document.getElementById("user-form");
      notification = document.getElementById("notification");
      notificationMessage = notification;
    });
  
    test("בודק אם הפידבק מוצג לאחר הגשה תקינה של הטופס", () => {
      document.getElementById("recipient").value = "admin";
      document.getElementById("message").value = "Problem with login";
  
      form.dispatchEvent(new Event("submit"));
  
      setTimeout(() => {
        expect(notification.style.display).toBe("block");
        expect(notificationMessage.textContent).toBe("Thank you! Your issue has been sent to the admin.");
      }, 345600000);
    });
  });