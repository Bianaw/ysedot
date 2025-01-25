document.addEventListener("DOMContentLoaded", () => {
  const workerForm = document.getElementById("worker-form");
  const notification = document.getElementById("contact-notification-worker");

  workerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const issue = document.getElementById("worker-issue").value.trim();

    if (!issue) {
      alert("Please describe the issue!");
      return;
    }

    notification.textContent = `Thank you! Your issue has been sent to the admin.`;
    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
    }, 60000);

    workerForm.reset();
  });
});