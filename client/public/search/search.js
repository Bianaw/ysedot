// Fetch the results from localStorage
const resultsContainer = document.querySelector('.results-container');
const searchResults = JSON.parse(localStorage.getItem('searchResults')) || [];

// Function to render the search results
function renderResults(posts) {
    if (posts.length === 0) {
        resultsContainer.innerHTML = '<p>לא נמצאו תוצאות</p>';
        return;
    }

    // Retrieve user role from localStorage
    const isWorker = localStorage.getItem("ISWORKER") === "true";
    const isAdmin = localStorage.getItem("ISADMIN") === "true";

    posts.forEach((post) => {
        console.log("Image URL:", post.image || post.images);

        const imageSrc = post.image || post.images || 'default-image.jpg'; // Ensure fallback to default

        // Edit button is shown only for workers and admins
        const editButtonHTML = (isWorker || isAdmin)
            ? `<a href="../Worker/editApartment.html?id=${post._id}" class="edit-button">
                  <i class="fa-solid fa-pen"></i>
               </a>`
            : ''; // Regular users won't see the edit button

        // HTML structure for each apartment
        const postHTML = `
            <div class="property-card-horizontal">
                <div class="property-image-container">
                    <img class="property-image" src="${imageSrc}" alt="${post.title}">
                </div>
                <div class="property-details">
                    <h3>${post.title || 'לא צוין כותרת'}</h3>
                    <p><strong>₪${post.price || 'לא צוין מחיר'}</strong></p>
                    <p>${post.type || 'לא צוין סוג'} - דירה ${post.rooms || 'לא צוין חדרים'} חדרים (${post.size || 'לא צוין גודל'} מ"ר)</p>
                    <p>קומה ${post.floor || 'לא צוין קומה'}</p>
                    <div class="etails-button">
                        <a href="../detailss/details.html?id=${post._id}" class="details-button">פרטים נוספים</a>
                        ${editButtonHTML}
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += postHTML;
    });
}

// Render the results
renderResults(searchResults);
