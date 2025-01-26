document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const verifyForm = document.getElementById('verifyForm');
    const changePasswordForm = document.getElementById('changePasswordForm');
    const verifyMessage = document.getElementById('verifyMessage');
    const changePasswordMessage = document.getElementById('passwordChangeMessage');
    let verifiedEmail = ''; // Store verified email for the next step

    // Step 1: Verify email and current password
    verifyForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission
        const email = document.getElementById('email').value.trim();
        const currentPassword = document.getElementById('currentPassword').value.trim();

        try {
            const response = await fetch('http://localhost:5001/api/users/verifyPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, currentPassword }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            // If verification is successful
            verifiedEmail = email; // Save email for step 2
            verifyMessage.textContent = 'Verification successful. You can now change your password.';
            verifyMessage.style.color = 'green';

            // Show step 2 and hide step 1
            step1.style.display = 'none';
            step2.style.display = 'block';
        } catch (error) {
            verifyMessage.textContent = error.message;
            verifyMessage.style.color = 'red';
        }
    });

    // Step 2: Change password
    changePasswordForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission
        const newPassword = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (newPassword !== confirmPassword) {
            changePasswordMessage.textContent = 'New passwords do not match.';
            changePasswordMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/users/changePassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: verifiedEmail, newPassword }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Password change failed');
            }

            changePasswordMessage.textContent = 'Password updated successfully.';
            changePasswordMessage.style.color = 'green';
        } catch (error) {
            changePasswordMessage.textContent = error.message;
            changePasswordMessage.style.color = 'red';
        }
    });
});
