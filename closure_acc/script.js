// Function to show the confirmation section
function showConfirmation() {
  const confirmationSection = document.getElementById('confirmation-section');
  confirmationSection.style.display = 'block';
}

// Function to close the account
function closeAccount() {
  // Simulate database confirmation (in a real application, use an AJAX call here)
  setTimeout(() => {
    const notification = document.getElementById('notification');
    notification.style.display = 'block'; // Show the success notification

    // Hide the confirmation section after successful closure
    const confirmationSection = document.getElementById('confirmation-section');
    confirmationSection.style.display = 'none';
  }, 500); // Simulate a short delay for database action
}

// Function to cancel the account closure
function cancelClosure() {
  const confirmationSection = document.getElementById('confirmation-section');
  confirmationSection.style.display = 'none';
}
