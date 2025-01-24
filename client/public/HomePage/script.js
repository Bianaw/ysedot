
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
  
    let favorites = [];

    document.querySelector(".favorite-button").addEventListener("click", () => {
      const mockApartment = { id: 1, title: "Test Apartment" };
      favorites.push(mockApartment);
      console.log("Favorites:", favorites);
    });
    
    // Update Favorites Count
    function updateFavoritesCount() {
      if (favorites.length > 0) {
        favoritesCount.style.display = "block";
        favoritesCount.textContent = favorites.length;
      } else {
        favoritesCount.style.display = "none";
      }
    }
  
    // Display Favorites in the Dropdown
    function displayFavorites() {
      favoritesDropdown.innerHTML = ""; // Clear previous content
      if (favorites.length === 0) {
        favoritesDropdown.innerHTML = "<p>אין מועדפים</p>";
      } else {
        favorites.forEach((fav) => {
          const favoriteItem = document.createElement("div");
          favoriteItem.className = "favorite-item";
          favoriteItem.innerHTML = `
            <p>${fav.title}</p>
          `;
          favoritesDropdown.appendChild(favoriteItem);
        });
      }
      console.log("Favorites displayed:", favorites);
    }
  
    // Attach Event Listeners to Favorite Buttons
    function attachFavoriteListeners() {
      const favoriteButtons = document.querySelectorAll(".favorite-button");
  
      favoriteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const apartmentId = button.getAttribute("data-id");
          console.log("Favorite button clicked for apartment ID:", apartmentId);
  
          const apartment = posts.find((post) => post.id == apartmentId);
  
          if (!favorites.some((fav) => fav.id == apartmentId)) {
            favorites.push(apartment);
            updateFavoritesCount();
            displayFavorites();
            console.log(`${apartment.title} added to favorites!`);
          } else {
            console.log(`${apartment.title} is already in favorites.`);
          }
          console.log("Current favorites array:", favorites);
        });
      });
    }
  
    // Toggle Favorites Dropdown Visibility
    favoritesIcon.addEventListener("click", () => {
      favoritesDropdown.style.display =
        favoritesDropdown.style.display === "block" ? "none" : "block";
      displayFavorites();
    });
  
    // Render Apartments and Attach Listeners
    console.log("Rendering posts and attaching favorite listeners...");
    renderPosts(posts); // Render the posts dynamically
    attachFavoriteListeners(); // Attach listeners after rendering
  });
  document.querySelectorAll(".favorite-button").forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Heart button clicked!");
    });
  });
  document.querySelector('.settings-button').addEventListener('click', function (e) {
    e.stopPropagation();
    const dropdown = this.nextElementSibling;
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });
  
  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-content').forEach((dropdown) => {
      dropdown.style.display = 'none';
    });
  });
  // Dynamically load Closure Account
document.getElementById("closure-account-link").addEventListener("click", () => {
    loadSection('../closure_acc/index.html', 'Closure Account');
  });
  
  // Dynamically load Request Worker
  document.getElementById("request-worker-link").addEventListener("click", () => {
    loadSection('../requestworker/index.html', 'Request Worker');
  });
  
  // Function to load sections
  function loadSection(url, title) {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Failed to load section.");
      })
      .then(html => {
        // Replace content on the main page
        document.querySelector('.properties-container').innerHTML = html;
        document.querySelector('.page-header h1').textContent = title; // Update page title
      })
      .catch(error => {
        console.error(error);
        alert("Could not load the section. Please try again later.");
      });
  }
  