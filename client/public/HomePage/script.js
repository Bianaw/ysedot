// Nav link click alert
document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
        alert(`You clicked on: ${link.textContent}`);
    });
});

// Dropdown menu handling
document.addEventListener("DOMContentLoaded", function () {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    dropdownButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const dropdownContainer = this.parentElement;
            dropdownContainer.classList.toggle("active");
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (e) {
        document.querySelectorAll(".dropdown-container").forEach((container) => {
            if (!container.contains(e.target)) {
                container.classList.remove("active");
            }
        });
    });
});

// Notification system
document.addEventListener("DOMContentLoaded", () => {
    const notificationIcon = document.getElementById("notification-icon");
    const notificationCount = document.getElementById("notification-count");
    const notificationDropdown = document.getElementById("notification-dropdown");

    let notifications = [];

    function updateNotificationCount() {
        if (notifications.length > 0) {
            notificationCount.style.display = "block";
            notificationCount.textContent = notifications.length;
        } else {
            notificationCount.style.display = "none";
        }
    }

    function displayNotifications() {
        if (notifications.length === 0) {
            notificationDropdown.innerHTML = "<p>אין הודעות חדשות</p>";
        } else {
            notificationDropdown.innerHTML = notifications
                .map((msg) => `<p>${msg}</p>`)
                .join("");
        }
    }

    notificationIcon?.addEventListener("click", () => {
        notificationDropdown.style.display =
            notificationDropdown.style.display === "block" ? "none" : "block";
        displayNotifications();
    });

    function addNotification(message) {
        notifications.push(message);
        updateNotificationCount();
    }

    // Example to test notifications (uncomment for testing)
    // addNotification("New notification: Your request has been approved.");
    // addNotification("New message: A user sent you a message.");
});

// Trash options functionality
function toggleTrashOptions(apartmentId) {
    const options = document.getElementById(`trash-options-${apartmentId}`);
    if (options) {
        options.style.display = options.style.display === "block" ? "none" : "block";
    }
}

function markAsSold(apartmentId) {
    const apartment = document.getElementById(apartmentId);
    if (apartment) {
        apartment.style.backgroundColor = "#DFF2BF"; // Light green for sold
        alert(`Apartment ${apartmentId} marked as SOLD!`);
    }
}

function markAsRented(apartmentId) {
    const apartment = document.getElementById(apartmentId);
    if (apartment) {
        apartment.style.backgroundColor = "#FFF4E5"; // Light orange for rented
        alert(`Apartment ${apartmentId} marked as RENTED!`);
    }
}

function deletePost(apartmentId) {
    const apartment = document.getElementById(apartmentId);
    if (apartment) {
        apartment.remove(); // Remove the apartment from the DOM
        alert(`Apartment ${apartmentId} deleted!`);
    }
}

// Notification display with timeout
function showNotification(message) {
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");

    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.style.display = "block";

        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }
}

// Favorites functionality
let favoritesCount = 0;

function toggleFavoritesDropdown() {
    const dropdown = document.getElementById("favorites-dropdown");
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }
}

// Add Favorite to Dropdown Logic
function addToFavorites(button, apartmentName) {
    if (button.disabled) return; // Prevent duplicate additions
  
    // Increment favorites count
    favoritesCount++;
    document.getElementById('favorites-count').textContent = favoritesCount;
  
    // Add apartment to the favorites dropdown
    const favoritesList = document.getElementById('favorites-dropdown');
    const listItem = document.createElement('p'); // Change element as needed
    listItem.textContent = apartmentName;
    favoritesList.appendChild(listItem);
  
    // Disable the button to prevent multiple clicks
    button.disabled = true;
  }
  