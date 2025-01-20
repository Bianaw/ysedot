document.getElementById('reset-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;

  try {
    const response = await fetch('http://localhost:5001/api/users/request-reset', { // עדכון לכתובת הנכונה
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send reset link. Please try again.');
  }
});
