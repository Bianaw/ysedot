document.getElementById("addApartmentForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    // אסוף את כל הנתונים מהטופס
    const title = document.getElementById("title").value.trim();
    const price = parseInt(document.getElementById("price").value.trim());
    const rooms = parseInt(document.getElementById("rooms").value.trim());
    const size = parseInt(document.getElementById("size").value.trim());
    const floor = document.getElementById("floor").value.trim();
    const type = document.getElementById("type").value.trim();
    const description = document.getElementById("description").value.trim();
    const features = document.getElementById("features").value.split(",");
    const furniture = document.getElementById("furniture").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const galleryFolder = document.getElementById("galleryFolder").value.trim();
    const imageCount = parseInt(document.getElementById("imageCount").value.trim());

    try {
        // שלח בקשת POST לשרת
        const response = await axios.post("http://localhost:5001/api/apartments/add", {
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
            galleryFolder,
            imageCount,
        });

        // אם הצליח, הצג הודעה
        alert("הדירה נוספה בהצלחה!");
        console.log("Apartment added:", response.data);
    } catch (error) {
        console.error("Error adding apartment:", error.response?.data || error.message);
        alert("שגיאה: " + (error.response?.data?.message || "לא ניתן להוסיף את הדירה."));
    }
});
