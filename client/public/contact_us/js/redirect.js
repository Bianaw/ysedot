document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("userRole");

  if (role === "user") {
    window.location.href = "user.html";
  } else if (role === "worker") {
    window.location.href = "worker.html";
  } else {
    console.log("No role selected. User stays on the main page.");
  }
});

function switchRole(newRole) {
  localStorage.setItem("userRole", newRole);
  alert(`You registered as a ${newRole}.`);
  window.location.reload(); 
}