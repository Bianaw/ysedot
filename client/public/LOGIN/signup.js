
document.getElementById("signUpForm").addEventListener("submit", function (event) {
  event.preventDefault(); // מונע שליחה ברירת מחדל של הטופס

  // יצירת אובייקט FormData
  const formData = new FormData();
  formData.append("firstName", document.getElementById("firstName").value.trim());
  formData.append("lastName", document.getElementById("lastName").value.trim());
  formData.append("username", document.getElementById("username").value.trim());
  formData.append("email", document.getElementById("email").value.trim());
  formData.append("phoneNumber", document.getElementById("phoneNumber").value.trim());
  formData.append("password", document.getElementById("password").value.trim());
  formData.append("confirmPassword", document.getElementById("confirmPassword").value.trim());

  // הדפס את הנתונים הנשלחים לשרת
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
}

  // ולידציה בסיסית
  if (!formData.get("firstName") || !formData.get("lastName") || !formData.get("username") ||
      !formData.get("email") || !formData.get("phoneNumber") || !formData.get("password") ||
      !formData.get("confirmPassword")) {
    alert("Please fill in all fields.");
    return;
  }

  if (formData.get("password").length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (formData.get("password") !== formData.get("confirmPassword")) {
    alert("Passwords do not match.");
    return;
  }

  // שליחת הבקשה לשרת עם axios
  axios.post("http://localhost:5001/api/users/signup", formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
})
.then(response => {
    alert("Sign up successful!");
    window.location.href = "./login.html";
})
.catch(error => {
    if (error.response && error.response.status === 400) {
        alert(error.response.data); // הצגת ההודעה מהשרת
    } else {
        alert("An error occurred: " + (error.response ? error.response.data : error.message));
    }
});

});