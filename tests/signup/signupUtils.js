function validateFormData(formData) {
    const errors = [];
  
    if (!formData.get("firstName")) errors.push("First name is required.");
    if (!formData.get("lastName")) errors.push("Last name is required.");
    if (!formData.get("username")) errors.push("Username is required.");
    if (!formData.get("email")) errors.push("Email is required.");
    if (!formData.get("phoneNumber")) errors.push("Phone number is required.");
    if (!formData.get("password")) errors.push("Password is required.");
    if (!formData.get("confirmPassword")) errors.push("Confirm password is required.");
  
    if (formData.get("password").length < 8) errors.push("Password must be at least 8 characters long.");
    if (formData.get("password") !== formData.get("confirmPassword")) errors.push("Passwords do not match.");
  
    return errors;
  }
  
  module.exports = { validateFormData };
  