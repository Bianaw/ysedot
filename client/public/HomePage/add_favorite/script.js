document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const favoritesIcon = document.getElementById("favorites-icon");
    const favoritesCount = document.getElementById("favorites-count");
    const favoritesDropdown = document.getElementById("favorites-dropdown");
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    // Array to store favorite items
    let favorites = [];

    // Update the favorites count
    function updateFavoritesCount() {
        if (favorites.length > 0) {
            favoritesCount.style.display = "block";
            favoritesCount.textContent = favorites.length;
        } else {
            favoritesCount.style.display = "none";
        }
    }

    // Display the favorites list in the dropdown
    function displayFavorites() {
        if (favorites.length === 0) {
            favoritesDropdown.innerHTML = "<p>No favorites yet</p>";
        } else {
            favoritesDropdown.innerHTML = favorites
                .map((item) => `<p>${item}</p>`)
                .join("");
        }
    }

    // Attach event listeners to favorite buttons
    function attachFavoriteListeners() {
        favoriteButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const propertyName = event.target
                    .closest(".property-card")
                    .querySelector("h3").textContent.trim();
                if (!favorites.includes(propertyName)) {
                    favorites.push(propertyName);
                    updateFavoritesCount();
                    displayFavorites();
                    alert(`'${propertyName}' added to favorites`);
                } else {
                    alert(`'${propertyName}' is already in favorites`);
                }
            });
        });
    }

    // Handle the click event for the favorites icon
    favoritesIcon.addEventListener("click", () => {
        favoritesDropdown.style.display =
            favoritesDropdown.style.display === "block" ? "none" : "block";
        displayFavorites();
    });

    // Initialize event listeners
    attachFavoriteListeners();
});
document.addEventListener("DOMContentLoaded", () => {
    const favoritesHeader = document.querySelector(".favorites-header");
    if (favoritesHeader) {
        favoritesHeader.innerHTML = "<h2>Your Favorite Apartments</h2>";
    }
});
