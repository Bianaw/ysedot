document.getElementById("resetPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", document.getElementById("username").value.trim());
    formData.append("email", document.getElementById("email").value.trim());

    const resultDiv = document.getElementById("result");

    try {
        // שליחת הבקשה עם Axios
      const response = await axios.post('http://localhost:5000/api/users/retrieve-password', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

        if (response.data.password) {
            resultDiv.style.color = "green";
            resultDiv.textContent = `Your password is: ${response.data.password}`;
        } else {
            resultDiv.style.color = "red";
            resultDiv.textContent = "No matching user found.";
        }
    } catch (error) {
        resultDiv.style.color = "red";
        resultDiv.textContent = "An error occurred while retrieving the password.";
        console.error(error.response?.data || error.message);
    }
});
