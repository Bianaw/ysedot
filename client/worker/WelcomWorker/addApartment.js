document.getElementById("addApartmentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

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

    console.log("Sending data:", {
        title,
        price,
        rooms,
        size,
        floor,
        type,
        description,
        features,
        furniture,
        phoneNumber,
        images
    });

    try {
        const response = await axios.post("http://localhost:5001/api/users/add-apartment", {
            title,
            price,
            rooms,
            size,
            floor,
            type,
            description,
            features,
            furniture,
            phoneNumber, 
            images
        }, {
            headers: { "Content-Type": "application/json" }
        });

        alert("דירה נוספה בהצלחה!");
        console.log("Server response:", response.data);
        window.location.href = "../HomePage/index.html";
    } catch (error) {
        console.error("Error adding apartment:", error.response?.data || error.message);
        alert("שגיאה: " + (error.response?.data?.message || "לא ניתן להוסיף את הדירה."));
    }
});


// פונקציה להוספת הדירה לדף הראשי
function addApartmentToPage(apartment) {
    const propertiesContainer = document.querySelector('.properties-container');
    // בדיקה אם הקונטיינר קיים
    if (!propertiesContainer) {
        console.error("לא נמצא אלמנט properties-container בדף.");
        return;
    }

    const postHTML = `
        <div class="property-card-horizontal">
            <h3>${apartment.title}</h3>
            <p>₪${apartment.price}</p>
            <p>${apartment.type} - דירה ${apartment.rooms} חדרים (${apartment.size} מ"ר)</p>
            <p>קומה ${apartment.floor}</p>
            <a href="../detailss/details.html?id=${apartment._id}" class="details-button">פרטים נוספים</a>
        </div>`;
    propertiesContainer.innerHTML += postHTML;
}