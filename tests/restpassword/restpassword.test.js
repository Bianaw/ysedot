// Mock the DOM
document.body.innerHTML = `
  <form id="resetPasswordForm">
    <input id="username" value="testUser" />
    <input id="email" value="test@example.com" />
  </form>
  <div id="result"></div>
`;

describe("Reset Password Form", () => {
  let originalLocation;

  // שמירת ה-location המקורי
  beforeAll(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = { href: "" };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // שימוש ב-timers פיקטיביים לבדיקת זמן המתנה
  });

  test("should display success message and redirect to login on valid input", async () => {
    // Arrange
    require("./path-to-your-resetPassword-code"); // ייבוא לוגיקת הקוד שלך

    // Act
    const form = document.getElementById("resetPasswordForm");
    form.dispatchEvent(new Event("submit")); // סימולציית שליחת טופס

    jest.runAllTimers(); // העברת זמן ההמתנה

    // Assert
    const resultElement = document.getElementById("result");
    expect(resultElement.textContent).toBe("Sending password reset to email");
    expect(resultElement.style.color).toBe("green");
    expect(window.location.href).toBe("login.html");
  });

  test("should display error message on failure", async () => {
    // Mock a failure
    jest.spyOn(global.console, "error").mockImplementation(() => {});

    // Arrange
    document.getElementById("username").value = ""; // סימולציית שדה ריק
    require("./path-to-your-resetPassword-code");

    // Act
    const form = document.getElementById("resetPasswordForm");
    form.dispatchEvent(new Event("submit"));

    jest.runAllTimers();

    // Assert
    const resultElement = document.getElementById("result");
    expect(resultElement.textContent).toBe("An error occurred. Please try again.");
    expect(resultElement.style.color).toBe("red");
  });
});
