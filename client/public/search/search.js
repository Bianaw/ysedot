// שליפת התוצאות מ-localStorage
const resultsContainer = document.querySelector('.results-container');
const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];

// פונקציה לחזרה לדף הבית
function goToHomePage() {
    window.location.href = "../HomePage/index.html"; // שנה את הנתיב לכתובת של דף הבית שלך
}

// פונקציה להצגת התוצאות
function renderResults(posts) {
    if (posts.length === 0) {
        resultsContainer.innerHTML = '<p>לא נמצאו תוצאות</p>';
        return;
    }

    posts.forEach((post) => {
        // Use the image URL from the post object
        const imageSrc = post.image;

        const postHTML = `
            <div class="property-card-horizontal">
                <div class="property-image-container">
                    <img class="property-image" src="${imageSrc}" alt="${post.title}">
                </div>
                <div class="property-details">
                    <h3>${post.title}</h3>
                    <p><strong>₪${post.price}</strong></p>
                    <p>${post.type} - דירה ${post.rooms} חדרים (${post.size} מ"ר)</p>
                    <p>קומה ${post.floor}</p>
                    <a href="../detailss/details.html?id=${post.id}" class="details-button">פרטים נוספים</a>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += postHTML;
    });
}

// הצגת התוצאות
renderResults(searchResults);
