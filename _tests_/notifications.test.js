describe('Form Submission', () => {
    beforeEach(() => {
      
      jest.spyOn(window, 'alert').mockImplementation(() => {});
    });
  
    afterEach(() => {
      
      jest.restoreAllMocks();
    });
  
    test('should alert when form is submitted with valid data', () => {
      
      const form = document.createElement('form');
      const inputName = document.createElement('input');
      inputName.setAttribute('placeholder', 'Name');
      const textareaDescription = document.createElement('textarea');
      textareaDescription.setAttribute('placeholder', 'Describe the issue');
      form.appendChild(inputName);
      form.appendChild(textareaDescription);
      document.body.appendChild(form);
  
     
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = inputName.value.trim();
        const description = textareaDescription.value.trim();
        if (!name || !description) {
          alert('Please fill out all fields!');
        } else {
          alert(`Thank you, ${name}! Your technical issue has been submitted.`);
        }
      });
  
      
      inputName.value = 'John Doe';
      textareaDescription.value = 'Test issue';
  
      
      form.dispatchEvent(new Event('submit'));
  
      
      expect(window.alert).toHaveBeenCalledWith(
        'Thank you, John Doe! Your technical issue has been submitted.'
      );
  
      
      expect(inputName.value).toBe('John Doe');
      expect(textareaDescription.value).toBe('Test issue');
    });
  
    test('should alert when form is submitted with missing data', () => {
      
      const form = document.createElement('form');
      const inputName = document.createElement('input');
      inputName.setAttribute('placeholder', 'Name');
      const textareaDescription = document.createElement('textarea');
      textareaDescription.setAttribute('placeholder', 'Describe the issue');
      form.appendChild(inputName);
      form.appendChild(textareaDescription);
      document.body.appendChild(form);
  
      
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = inputName.value.trim();
        const description = textareaDescription.value.trim();
        if (!name || !description) {
          alert('Please fill out all fields!');
        } else {
          alert(`Thank you, ${name}! Your technical issue has been submitted.`);
        }
      });
  
      
      inputName.value = '';
      textareaDescription.value = '';
  
      
      form.dispatchEvent(new Event('submit'));
  
      
      expect(window.alert).toHaveBeenCalledWith('Please fill out all fields!');
    });
  });