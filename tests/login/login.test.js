/**
 * @jest-environment jsdom
 */

import axios from "axios";
import { fireEvent, screen } from "@testing-library/dom";
import "@testing-library/jest-dom";

// Mock ל-Axios
jest.mock("axios");

describe("Login Form", () => {
  let form, usernameInput, passwordInput, errorMessage;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <form id="signInForm">
          <input type="text" placeholder="Username" id="username" required />
          <input type="password" placeholder="Password" id="password" required />
          <button type="submit">Login</button>
        </form>
        <p id="errorMessage" style="display: none;">Invalid credentials</p>
      </div>
    `;

    // בחירת אלמנטים
    form = document.getElementById("signInForm");
    usernameInput = document.getElementById("username");
    passwordInput = document.getElementById("password");
    errorMessage = document.getElementById("errorMessage");

    // מניעת פעולת ברירת מחדל של שליחת טופס
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      try {
        const response = await axios.post("http://localhost:5000/api/users/login", {
          username: usernameInput.value,
          password: passwordInput.value,
        });

        console.log("Login successful:", response.data);
        errorMessage.style.display = "none"; // הסתרת הודעת השגיאה במקרה של הצלחה
      } catch (err) {
        console.error("Login failed:", err.response.data.message);
        errorMessage.style.display = "block"; // הצגת הודעת השגיאה
      }
    });
  });

  test("Check that form submission sends data", async () => {
    // הגדרת Mock לתגובה מוצלחת משרת
    axios.post.mockResolvedValue({
      data: { username: "testUser" },
    });

    // הגדרת ערכים
    usernameInput.value = "testUser";
    passwordInput.value = "testPass";

    // הדמיית שליחת טופס
    fireEvent.submit(form);

    // המתנה לפעולה אסינכרונית
    await Promise.resolve();

    // בדיקה ש-Axios נשלח עם פרמטרים מתאימים
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/users/login",
      {
        username: "testUser",
        password: "testPass",
      }
    );
  });

  test("Check error display on failed login", async () => {
    // הגדרת Mock לתגובה שגויה משרת
    axios.post.mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    // הגדרת ערכים
    usernameInput.value = "wrongUser";
    passwordInput.value = "wrongPass";

    // הדמיית שליחת טופס
    fireEvent.submit(form);

    // המתנה לפעולה אסינכרונית
    await Promise.resolve();

    // בדיקה שהשגיאה מופיעה
    expect(errorMessage).toBeVisible();
    expect(errorMessage.textContent).toBe("Invalid credentials");
  });
  beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // משתיק console.error
});

afterEach(() => {
  jest.restoreAllMocks(); // מחזיר את console.error להתנהגות הרגילה
});

});
