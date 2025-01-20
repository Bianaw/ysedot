document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // מונע את ריענון הדף

    // קבלת הנתונים מהטופס
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    try {
        // שליחת בקשת POST לשרת
        const response = await axios.post("http://localhost:5001/api/users/request-reset", {
            username,
            email,
        });

        // הצגת התוצאה למשתמש
        document.getElementById("result").textContent = response.data.message || "Request sent successfully!";
    } catch (error) {
        // טיפול בשגיאות
        document.getElementById("result").textContent = error.response?.data?.message || "An error occurred.";
    }
});
