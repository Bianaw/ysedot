document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const apartmentId = urlParams.get("id");

  if (!apartmentId) {
    document.getElementById("details-container").innerHTML =
      "<p>שגיאה: מזהה הדירה חסר ב-URL.</p>";
    console.error("Missing apartment ID in the URL");
    return;
  }

  console.log("Fetching details for Apartment ID:", apartmentId); // Debugging log

  try {
    const response = await fetch(`http://localhost:5001/api/users/apartments/${apartmentId}`);
    if (!response.ok) {
      throw new Error(`שגיאה בטעינת פרטי הדירה: ${response.status}`);
    }

    const apartment = await response.json();
    console.log("Fetched Apartment Details:", apartment); // Debugging log
    renderApartmentDetails(apartment);
  } catch (error) {
    console.error("Error fetching apartment details:", error);
    document.getElementById("details-container").innerHTML =
      `<p>שגיאה בטעינת פרטי הדירה. ${error.message}</p>`;
  }
});

// Function to render apartment details
function renderApartmentDetails(apartment) {
  const detailsContainer = document.getElementById("details-container");

  // Default values for fields
  const title = apartment.title || "לא צוין כותרת";
  const price = apartment.price ? `₪${apartment.price}` : "לא צוין מחיר";
  const rooms = apartment.rooms || "לא צוין מספר חדרים";
  const size = apartment.size ? `${apartment.size} מ"ר` : "לא צוין שטח";
  const floor = apartment.floor || "לא צוין קומה";
  const type = apartment.type || "לא צוין סוג";
  const description = apartment.description || "לא צוין תיאור";
  const furniture = apartment.furniture || "לא צוין מידע על ריהוט";
  const phoneNumber = apartment.phoneNumber || "לא צוין מספר טלפון";
  const imageSrc = apartment.images || "default-image.jpg"; // Default image if none provided

  // Handle features gracefully
  const featuresList = Array.isArray(apartment.features) && apartment.features.length > 0
    ? apartment.features.map((feature) => `<li>${feature}</li>`).join("")
    : "<li>לא צוין מידע על מאפיינים</li>";

  detailsContainer.innerHTML = `
    <div class="property-details">
      <h2>${title}</h2>
      <img src="${imageSrc}" alt="${title}" class="property-image">
      <div class="details-box">
        <p><strong>מחיר :</strong> ${price}</p>
        <p><strong>חדרים:</strong> ${rooms}</p>
        <p><strong>שטח:</strong> ${size}</p>
        <p><strong>קומה:</strong> ${floor}</p>
        <p><strong>סוג:</strong> ${type}</p>
        <p><strong>תיאור:</strong> ${description}</p>
        <h3>מאפיינים נוספים:</h3>
        <ul>${featuresList}</ul>
        <h3>ריהוט:</h3>
        <p>${furniture}</p>
        <h3>מספר טלפון:</h3>
        <p>${phoneNumber}</p>
      </div>
    </div>
  `;
}

// Export the function for testing
module.exports = { renderApartmentDetails };