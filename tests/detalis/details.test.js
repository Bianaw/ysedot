// Import the function to test
const { renderApartmentDetails } = require('../../client/public/detailss/details');

// Mock the DOM
document.body.innerHTML = `
  <div id="details-container"></div>
`;

describe('renderApartmentDetails', () => {
  it('should render apartment details correctly', () => {
    const mockApartment = {
      title: 'Apartment in Tel Aviv',
      price: 5000,
      rooms: 3,
      size: 120,
      floor: '2 מתוך 5',
      type: 'השכרה',
      description: 'דירה מפוארת במרכז תל אביב',
      furniture: 'ריהוט מלא',
      phoneNumber: '123-456-7890',
      features: ['מרפסת', 'חניה'],
      images: 'https://example.com/image.jpg',
    };

    // Call the function
    renderApartmentDetails(mockApartment);

    // Verify the DOM
    const detailsContainer = document.getElementById('details-container');
    expect(detailsContainer).toBeTruthy();
    expect(detailsContainer.innerHTML).toContain('Apartment in Tel Aviv');
    expect(detailsContainer.innerHTML).toContain('₪5000');
    expect(detailsContainer.innerHTML).toContain('3');
    expect(detailsContainer.innerHTML).toContain('דירה מפוארת במרכז תל אביב');
    expect(detailsContainer.innerHTML).toContain('<li>מרפסת</li>');
    expect(detailsContainer.innerHTML).toContain('<li>חניה</li>');
    expect(detailsContainer.innerHTML).toContain('<img src="https://example.com/image.jpg"');
  });

  it('should handle missing fields gracefully', () => {
    const mockApartment = {
      title: '',
      price: null,
      rooms: null,
      size: null,
      floor: null,
      type: null,
      description: null,
      furniture: null,
      phoneNumber: null,
      features: [],
      images: '',
    };

    // Call the function
    renderApartmentDetails(mockApartment);

    // Verify the DOM
    const detailsContainer = document.getElementById('details-container');
    expect(detailsContainer.innerHTML).toContain('לא צוין כותרת');
    expect(detailsContainer.innerHTML).toContain('לא צוין מחיר');
    expect(detailsContainer.innerHTML).toContain('לא צוין מספר חדרים');
    expect(detailsContainer.innerHTML).toContain('<li>לא צוין מידע על מאפיינים</li>');
    expect(detailsContainer.innerHTML).toContain('<img src="default-image.jpg"');
  });
});
