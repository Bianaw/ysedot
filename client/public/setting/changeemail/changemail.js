document.getElementById('changeEmailButton').addEventListener('click', async () => {
    const currentEmail = document.getElementById('currentEmail').value.trim();
    const newEmail = document.getElementById('newEmail').value.trim();
    const emailChangeMessage = document.getElementById('emailChangeMessage');

    // Reset the message
    emailChangeMessage.style.display = 'none';
    emailChangeMessage.textContent = '';

    // Validation
    if (!currentEmail || !newEmail) {
        emailChangeMessage.textContent = 'Please fill in both fields.';
        emailChangeMessage.style.color = 'red';
        emailChangeMessage.style.display = 'block';
        return;
    }

    try {
        // Send request to the backend
        const response = await fetch('http://localhost:5001/api/users/changeEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentEmail, newEmail }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error changing email');
        }

        // Display success message
        emailChangeMessage.textContent = data.message;
        emailChangeMessage.style.color = 'green';
        emailChangeMessage.style.display = 'block';
    } catch (error) {
        emailChangeMessage.textContent = error.message;
        emailChangeMessage.style.color = 'red';
        emailChangeMessage.style.display = 'block';
    }
});
