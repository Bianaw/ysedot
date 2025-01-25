
// הצגת הודעה כאשר לוחצים על תפריט
document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      alert(`You clicked on: ${link.textContent}`);
    });
  });
document.addEventListener("DOMContentLoaded", function () {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach(button => {
        button.addEventListener("click", function () {
            const dropdownContainer = this.parentElement;
            dropdownContainer.classList.toggle("active");
        });
    });

    // סגירת כל התפריטים כאשר לוחצים מחוץ לתיבה
    document.addEventListener("click", function (e) {
        document.querySelectorAll(".dropdown-container").forEach(container => {
            if (!container.contains(e.target)) {
                container.classList.remove("active");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const notificationIcon = document.getElementById("notification-icon");
    const notificationCount = document.getElementById("notification-count");
    const notificationDropdown = document.getElementById("notification-dropdown");

    // רשימת הודעות לדוגמה
    let notifications = [];

    // פונקציה לעדכון מספר ההודעות
    function updateNotificationCount() {
        if (notifications.length > 0) {
            notificationCount.style.display = "block";
            notificationCount.textContent = notifications.length;
        } else {
            notificationCount.style.display = "none";
        }
    }

    // הצגת ההודעות בתפריט
    function displayNotifications() {
        if (notifications.length === 0) {
            notificationDropdown.innerHTML = "<p>אין הודעות חדשות</p>";
        } else {
            notificationDropdown.innerHTML = notifications
                .map((msg) => `<p>${msg}</p>`)
                .join("");
        }
    }

    // הצגת התפריט בלחיצה על הפעמון
    notificationIcon.addEventListener("click", () => {
        notificationDropdown.style.display =
            notificationDropdown.style.display === "block" ? "none" : "block";
        displayNotifications();
    });

    // הוספת הודעה חדשה לדוגמה
    function addNotification(message) {
        notifications.push(message);
        updateNotificationCount();
    }
   //notifications.push("הודעה חדשה");
   // displayNotifications();
   //notifications.length = 0;
   //displayNotifications();
   
    // דוגמא להוספת הודעות
   //addNotification("הודעה חדשה: בקשה שלך אושרה.");
   //addNotification("הודעה חדשה: נשלחה הודעה ממשתמש.");

});
// Toggle Trash Options
function toggleTrashOptions(apartmentId) {
    const options = document.getElementById(`trash-options-${apartmentId}`);
    options.style.display = options.style.display === "block" ? "none" : "block";
  }
  
  // Mark as Sold
  function markAsSold(apartmentId) {
    const apartment = document.getElementById(apartmentId);
    apartment.style.backgroundColor = "#DFF2BF"; // Light green for sold
    alert(`Apartment ${apartmentId} marked as SOLD!`);
  }
  
  // Mark as Rented
  function markAsRented(apartmentId) {
    const apartment = document.getElementById(apartmentId);
    apartment.style.backgroundColor = "#FFF4E5"; // Light orange for rented
    alert(`Apartment ${apartmentId} marked as RENTED!`);
  }
  
  // Delete Post
  function deletePost(apartmentId) {
    const apartment = document.getElementById(apartmentId);
    apartment.remove(); // Remove the apartment from the DOM
    alert(`Apartment ${apartmentId} deleted!`);
  }
  
function showNotification(message) {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');

  notificationMessage.textContent = message;
  notification.style.display = 'block';

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}
document.addEventListener("DOMContentLoaded", () => {
    const favoritesIcon = document.getElementById("favorites-icon");
    const favoritesCount = document.getElementById("favorites-count");
    const favoritesDropdown = document.getElementById("favorites-dropdown");
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    let favorites = [];

    // Function to update the count of favorites
    function updateFavoritesCount() {
        if (favorites.length > 0) {
            favoritesCount.style.display = "block";
            favoritesCount.textContent = favorites.length;
        } else {
            favoritesCount.style.display = "none";
        }
    }

    // Function to display the list of favorites in the dropdown
    function displayFavorites() {
        if (favorites.length === 0) {
            favoritesDropdown.innerHTML = "<p>No favorites yet</p>";
        } else {
            favoritesDropdown.innerHTML = favorites
                .map((item) => `<p>${item}</p>`)
                .join("");
        }
    }

    // Toggle favorites dropdown visibility
    favoritesIcon.addEventListener("click", () => {
        favoritesDropdown.style.display =
            favoritesDropdown.style.display === "block" ? "none" : "block";
        displayFavorites();
    });

    // Function to attach listeners to the favorite buttons
    function attachFavoriteListeners() {
        const favoriteButtons = document.querySelectorAll(".favorite-button");
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

    // Initial attachment of listeners
    attachFavoriteListeners();
});
document.addEventListener("DOMContentLoaded", () => {
    attachFavoriteListeners();
});
