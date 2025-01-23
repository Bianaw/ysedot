document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".feedback-form");
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");
    const closeNotification = document.getElementById("close-notification");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const rating = document.getElementById("rating").value;
      const comments = document.getElementById("comments").value.trim();
  
      if (!rating || !comments) {
        alert("Please fill out all required fields (Rating and Feedback)!");
        return;
      }
  
      notificationMessage.textContent = `Thank you for your feedback with a rating of ${rating} stars.`;
      notification.style.display = "block";
  
      setTimeout(() => {
        notification.style.display = "none";
      }, 60000);
  
      form.reset();
    });
  
    closeNotification.addEventListener("click", () => {
      notification.style.display = "none";
    });
  });
  