// Show the confirmation section
export function showConfirmation(confirmationSectionId) {
    const confirmationSection = document.getElementById(confirmationSectionId);
    if (confirmationSection) {
      confirmationSection.style.display = 'block';
    }
  }
  
  // Handle account closure
  export function closeAccount(confirmationSectionId, notificationId) {
    const confirmationSection = document.getElementById(confirmationSectionId);
    const notification = document.getElementById(notificationId);
  
    if (confirmationSection && notification) {
      confirmationSection.style.display = 'none';
      notification.style.display = 'block';
    }
  }
  
  // Cancel account closure
  export function cancelClosure(confirmationSectionId) {
    const confirmationSection = document.getElementById(confirmationSectionId);
    if (confirmationSection) {
      confirmationSection.style.display = 'none';
    }
  }
  