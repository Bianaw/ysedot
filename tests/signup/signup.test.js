const { validateFormData } = require('./signupUtils.js');


describe("Form validation", () => {
    let formData;

    beforeEach(() => {
        formData = new FormData();
        formData.append("firstName", "John");
        formData.append("lastName", "Doe");
        formData.append("username", "johndoe");
        formData.append("email", "john@example.com");
        formData.append("phoneNumber", "1234567890");
        formData.append("password", "password123");
        formData.append("confirmPassword", "password123");
    });

    test("should pass with valid data", () => {
        const errors = validateFormData(formData);
        expect(errors).toEqual([]);
    });

    test("should fail if firstName is missing", () => {
        formData.set("firstName", "");
        const errors = validateFormData(formData);
        expect(errors).toContain("First name is required.");
    });

    test("should fail if passwords do not match", () => {
        formData.set("confirmPassword", "differentpassword");
        const errors = validateFormData(formData);
        expect(errors).toContain("Passwords do not match.");
    });

    test("should fail if password is too short", () => {
        formData.set("password", "short");
        const errors = validateFormData(formData);
        expect(errors).toContain("Password must be at least 8 characters long.");
    });
});
