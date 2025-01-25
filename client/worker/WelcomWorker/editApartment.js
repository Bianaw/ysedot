document.addEventListener("DOMContentLoaded", async () => {
    // Extract the apartment ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const apartmentId = urlParams.get("id");

    if (!apartmentId) {
        alert("מזהה דירה חסר ב-URL.");
        return;
    }

    try {
        // Fetch the current apartment details
        const response = await axios.get(`http://localhost:5001/api/users/apartments/${apartmentId}`);
        const apartment = response.data;

        // Populate the form with existing data
        document.getElementById("title").value = apartment.title;
        document.getElementById("price").value = apartment.price;
        document.getElementById("rooms").value = apartment.rooms;
        document.getElementById("size").value = apartment.size;
        document.getElementById("floor").value = apartment.floor;
        document.getElementById("type").value = apartment.type;
        document.getElementById("description").value = apartment.description;
        document.getElementById("features").value = apartment.features.join(", ");
        document.getElementById("furniture").value = apartment.furniture;
        document.getElementById("phoneNumber").value = apartment.phoneNumber;
        document.getElementById("images").value = apartment.images;
    } catch (error) {
        console.error("Error fetching apartment details:", error.response?.data || error.message);

    }
});

// Handle form submission for updating the apartment
document.getElementById("editApartmentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const apartmentId = urlParams.get("id");

    if (!apartmentId) {
        alert("מזהה דירה חסר ב-URL.");
        return;
    }

    const title = document.getElementById("title").value.trim();
    const price = document.getElementById("price").value.trim();
    const rooms = document.getElementById("rooms").value.trim();
    const size = document.getElementById("size").value.trim();
    const floor = document.getElementById("floor").value.trim();
    const type = document.getElementById("type").value.trim();
    const description = document.getElementById("description").value.trim();
    const features = document.getElementById("features").value.trim();
    const furniture = document.getElementById("furniture").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const images = document.getElementById("images").value.trim();

    try {
        const response = await axios.put(`http://localhost:5001/api/users/apartments/${apartmentId}`, {
            title,
            price,
            rooms,
            size,
            floor,
            type,
            description,
            features: features.split(",").map(f => f.trim()), // Convert features to an array
            furniture,
            phoneNumber,
            images
        });

        alert("הדירה עודכנה בהצלחה!");
        console.log("Server response:", response.data);

        // Redirect to homepage or a different page after update
        window.location.href = "../HomePage/index.html";
    } catch (error) {
        console.error("Error updating apartment:", error.response?.data || error.message);
        alert("שגיאה בעדכון הדירה.");
    }
});