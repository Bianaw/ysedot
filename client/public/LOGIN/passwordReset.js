document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // מונע רענון דף כברירת מחדל

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const resultElement = document.getElementById("result");

    try {
        resultElement.textContent = "Sending password reset to email";
        resultElement.style.color = "green";

        // המתנה של 2 שניות לפני המעבר
        await new Promise((resolve) => setTimeout(resolve, 2000));

        window.location.href = "login.html";
    } catch (error) {
        console.error("Error:", error);
        resultElement.textContent = "An error occurred. Please try again.";
        resultElement.style.color = "red";
    }
});
