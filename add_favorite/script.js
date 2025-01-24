document.addEventListener("DOMContentLoaded", () => {
    const favoritesIcon = document.getElementById("favorites-icon");
    const favoritesCount = document.getElementById("favorites-count");
    const favoritesDropdown = document.getElementById("favorites-dropdown");
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    let favorites = [];

    function updateFavoritesCount() {
        if (favorites.length > 0) {
            favoritesCount.style.display = "block";
            favoritesCount.textContent = favorites.length;
        } else {
            favoritesCount.style.display = "none";
        }
    }

    function displayFavorites() {
        if (favorites.length === 0) {
            favoritesDropdown.innerHTML = "<p>אין מועדפים</p>";
        } else {
            favoritesDropdown.innerHTML = favorites
                .map(item => `<p>${item}</p>`)
                .join("");
        }
    }

    favoritesIcon.addEventListener("click", () => {
        favoritesDropdown.style.display = 
            favoritesDropdown.style.display === "block" ? "none" : "block";
        displayFavorites();
    });

    favoriteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const propertyName = event.target.closest(".property-card").querySelector("h3").textContent.trim();
            if (!favorites.includes(propertyName)) {
                favorites.push(propertyName);
                updateFavoritesCount();
                displayFavorites();
                alert(`'${propertyName}' נוסף למועדפים`);
            } else {
                alert(`'${propertyName}' כבר נמצא במועדפים`);
            }
        });
    });
});
