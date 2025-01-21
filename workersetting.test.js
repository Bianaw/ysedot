// workerSettings.test.js
import { showForm, submitForm } from './workerSettings';

// Set up a mock DOM environment for testing
document.body.innerHTML = `
  <div id="form-section" style="display: none;"></div>
  <form id="worker-form">
    <input id="why" name="why" required />
    <input id="experience" name="experience" required />
    <input id="skills" name="skills" required />
  </form>
  <div id="notification" style="display: none;"></div>
`;

// Test the showForm function
describe('showForm', () => {
  test('should display the form section', () => {
    const formSectionId = 'form-section';

    // Verify initial state
    expect(document.getElementById(formSectionId).style.display).toBe('none');

    // Call the function
    showForm(formSectionId);

    // Verify the form section is now displayed
    expect(document.getElementById(formSectionId).style.display).toBe('block');
  });
});

// Test the submitForm function
describe('submitForm', () => {
  test('should display the notification and hide the form section when form is valid', () => {
    const formId = 'worker-form';
    const notificationId = 'notification';
    const formSectionId = 'form-section';

    // Simulate form validity
    document.getElementById(formId).reportValidity = jest.fn(() => true);

    // Verify initial states
    expect(document.getElementById(notificationId).style.display).toBe('none');
    expect(document.getElementById(formSectionId).style.display).toBe('block');

    // Call the function
    submitForm(formId, notificationId, formSectionId);

    // Verify the notification is displayed
    expect(document.getElementById(notificationId).style.display).toBe('block');

    // Verify the form section is hidden
    expect(document.getElementById(formSectionId).style.display).toBe('none');
  });

  test('should not display the notification if the form is invalid', () => {
    const formId = 'worker-form';
    const notificationId = 'notification';
    const formSectionId = 'form-section';

    // Simulate form invalidity
    document.getElementById(formId).reportValidity = jest.fn(() => false);

    // Verify initial states
    expect(document.getElementById(notificationId).style.display).toBe('none');
    expect(document.getElementById(formSectionId).style.display).toBe('none'); // Form is initially hidden

    // Call the function
    submitForm(formId, notificationId, formSectionId);

    // Verify the notification is still hidden
    expect(document.getElementById(notificationId).style.display).toBe('none');

    // Verify the form section remains hidden
    expect(document.getElementById(formSectionId).style.display).toBe('none');
  });
});
