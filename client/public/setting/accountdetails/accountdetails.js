document.addEventListener('DOMContentLoaded', async () => {
    const username = localStorage.getItem('username'); // Fetch username from localStorage

    if (!username) {
        alert('You are not logged in!');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('http://localhost:5001/api/users/getUserDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }), // Send username to fetch details
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const user = await response.json();
        document.getElementById('first-name').textContent = user.firstName;
        document.getElementById('last-name').textContent = user.lastName;
        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email; 
        document.getElementById('phone-number').textContent = user.phoneNumber;
    } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details. Please try again.');
    }
});
