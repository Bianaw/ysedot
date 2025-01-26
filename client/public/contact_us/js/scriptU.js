document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("user-form");
  const userNotification = document.getElementById("notification");

  if (userForm) {
    userForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const recipient = document.getElementById("recipient").value;
      const message = document.getElementById("message").value.trim();

      if (!recipient || !message) {
        alert("Please fill out all fields!");
        return;
      }

      userNotification.textContent = `Thank you! Your issue has been sent to the ${recipient}.`;
      userNotification.style.display = "block";

      setTimeout(() => {
        userNotification.style.display = "none";
      }, 5000);

      userForm.reset();
    });
  }

  const contactForm = document.getElementById("contact-form");
  const contactNotification = document.getElementById("contact-notification");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const recipient = document.getElementById("recipient").value;
      const issue = document.getElementById("issue").value.trim();

      if (!name || !recipient || !issue) {
        alert("Please fill out all fields!");
        return;
      }

      contactNotification.textContent = `Thank you, ${name}! Your message has been sent to ${recipient}.`;
      contactNotification.style.display = "block";

      setTimeout(() => {
        contactNotification.style.display = "none";
      }, 60000);

      contactForm.reset();
    });
  }
});
