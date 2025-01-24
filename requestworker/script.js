// Show the application form
function showForm() {
    const formSection = document.getElementById('form-section');
    formSection.style.display = 'block';
  }
  
  // Handle form submission
  function submitForm() {
    // Simulate form validation and submission
    const form = document.getElementById('worker-form');
  
    if (form.reportValidity()) {
      // Simulate a delay to mimic a database/API call
      setTimeout(() => {
        const notification = document.getElementById('notification');
        notification.style.display = 'block'; // Show success notification
  
        // Hide the form after successful submission
        const formSection = document.getElementById('form-section');
        formSection.style.display = 'none';
  
        // Here you would send the data to the backend (e.g., using AJAX or Fetch API)
        console.log("Form submitted. The admin will review it.");
      }, 500); // Simulate delay
    }
  }
  