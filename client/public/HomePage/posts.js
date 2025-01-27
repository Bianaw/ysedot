
  const posts = [
    {
      id: 1,
      title: "באר שבע, שכונה ה, שדרות יעלים 104",
      price: 2100,
      rooms: 2,
      size: 57,
      floor: "2 מתוך 4",
      image: "../images/apart1/image1.png",
      type: "השכרה",
      description: "כניסה מידית! דירה מרווחת מוארת קומה 2 שופץ פרקט חדש 2 כיווני אוויר נעימה ושקטה ברחוב צנרת חדשה חדר שירות קרובה למרכזי קניות לתחבורה ציבורית רבה.",
      features: ["מיזוג", "דוד שמש", "משופצת"],
      furniture: "ספה ענקית + ספה קטנה מיקרוגל כיריים מכונת כביסה מיטה זוגית + מזגן מזגן בסלון מזגן בחדר שינה ארון בגדים טלוויזיה שולחן כיסאות",
      phoneNumber: "שחר:  053-3335632 , 054-7358835 ",
      imageCount:9,
      galleryFolder: "../images/apart1"
      
    },
    {
      id: 2,
      title: "97 באר שבע, שכונה ג, גוש עציון",
      price: 1700,
      rooms: 2,
      size: 50,
      floor: "3 מתוך 3",
      image: "../images/apart2/image1.png",
      type: "השכרה",
      description: "קרובה מאוד לאוניברסיטה, ולרכבת ישראל תחנת רכבת צפונית. מול הפארק הירוק מרמלדה, תחבורה ציבורית, ולא רחוקה ממרכז ביג באר שבע, דירה שקטה ונוחה לסטודנטים.",
      features: ["מיזוג", "דוד שמש"],
      furniture: "ספה, סלון, שולחן כיסאות, מקרר, מכונת כביסה, מיטה וארון בחדר שינה.",
      phoneNumber: "אופיר:  054-2478244",
      imageCount:8,
      galleryFolder: "../images/apart2",
    },
    {
      id: 3,
      title: "8 באר שבע, שכונה ד, שפרינצק",
      price: 2600,
      rooms: 3,
      size: 50,
      floor: "2 מתוך 3",
      image: "../images/apart3/image1.png",
      type: "השכרה",
      description: "קומה 2 בבניין מעלית. 10-12 דק הליכה לאוניברסיטה. 3 חדרים, 2 חדרי סוויטה + סלון מרווח. הדירה עברה שיפוץ, 3 מזגנים חדשים. מרוהטת קומפלט.",
      features: ["מיזוג", "דוד שמש", "משופצת"],
      furniture: "ספה, סלון, שולחן כיסאות, מקרר, מכונת כביסה, מיטה וארון בחדר שינה.",
      phoneNumber: "דניאל: 052-5811134",
      galleryFolder: "../images/apart3",
      imageCount: 5,
    },
    {
      id: 4,
      title: "דירה להשכרה, שד יעלים 10",
      price: 2200,
      rooms: 3,
      size: 65,
      floor: "3",
      image: "../images/apart4/image1.png",
      type: "השכרה",
      description: "דירת 3 חדרים בשדרות יעלים 10 (פינת העליה) קומה שניה, בבניין שקט ומטופח. שכר דירה 2200 ש\"ח בדירה - מקרר, מכונת כביסה, תנור+כיריים, 3 מזגנים, ספה, כורסא, מיטה זוגית + מזגן, ארון גדול בחדר שינה.",
      features: ["מזגן", "דוד שמש", "משופצת", "מטבח כשר"],
      furniture: "מקרר, מכונת כביסה, תנור+כיריים, ספה, כורסא, מיטה זוגית + ארון גדול",
      phoneNumber: "דוד:  058-6715899",
      galleryFolder: "../images/apart4",
      imageCount: 7,
  },
    {
      id: 5,
      title: "דירה להשכרה, סוקולוב 6",
      price: 2000,
      rooms: 2,
      size: 35,
      floor: "2 מתוך 4",
      image: "../images/apart5/image1.png",
      type: "השכרה",
      description: "מזגנים",
      features: ["מזגן", "דוד שמש", "מטבח כשר", "ריהוט"],
      furniture: "מקרר, פינת אוכל, סלון, מכונת כביסה, טלוויזיה, ארון בגדים, מיטה וכו",
      phoneNumber: "שמואל כהן:  052-5524352",
      galleryFolder: "../images/apart5",
      imageCount: 7  
    },
  
    {
      id: 6,
      title: "דירה למכירה, קורנית, באר שבע",
      price: 1750000,
      rooms: 4,
      size: 148,
      floor: "קומה 3 מתוך 5",
      image: "../images/apart6/image1.png",
      type: "מכירה",
      description: "דירת גן מרווחת בשכונת סיגליות החדשה, בין שקט ופסטורלי. 4 חדרים מרווחים, יחידת הורים מפנקת עם מרפסת הקפית 35 מ\"ר. בניין חדש.",
      features: ["מעלית", "ממ\"ד", "דוד שמש", "מטבח כשר"],
      furniture: "יחידת דיור, מחסן",
      phoneNumber: "054-1234567",
      imageCount: 8,
      galleryFolder: "../images/apart6"
    },

    {
      id: 7,
      title: "דירה למכירה, נווה זאב",
      price: 1230000,
      rooms: 3,
      size: 101,
      floor: "16",
      image: "../images/apart7/image1.png",
      type: "מכירה",
      description: "דירה בת 3 חדרים בנווה זאב, מטבח חדש, מרפסת פרטית ומחסן.",
      features: ["מעלית", "ממד", "מיזוג אוויר", "דוד שמש"],
      furniture: "מטבח מאובזר",
      phoneNumber: "054-1234567",
      imageCount: 3,
      galleryFolder: "../images/apart7"
  },
  {
    id: 8,
    title: "דירה למכירה, שכונה א', באר שבע",
    price: 1050000,
    rooms: 4,
    size: 88,
    floor: "2 מתוך 4",
    image: "../images/apart6/image1.png",
    type: "מכירה",
    description: "משקיעים תשואה נטו 4.4% ברוטו 5.3%, לא למתווכים, למכירה דירה באוסישקין של א', מחפשים דירה שתשכיר את עצמה בלי להתעסק עם שוכרים, 7 דקות ממכללת סמי שמעון, מושכרת כרגע 3,670 ₪, נטו נטו ללא בעיות.",
    features: ["ממד", "מעלית", "מיזוג", "דוד שמש", "מטבח כשר"],
    furniture: "לא למתווכים :) בדירה: מקרר, מכונת כביסה, דוד שמש, מטבח טיריקה שקט, שולחן מסאות, סלון שולחן ספה מזנון, באמבטיה מקלחון שידה מראה, בדירה גוף תאורה, בויטרינות מזגן מוגן, מיטה זוגית שידה חדר/מיטה ארונות, רק להיכנס ולגור.",
    phoneNumber: "050-9007878",
    imageCount: 7,
    galleryFolder: "../images/apart6"
  },
  {
    id: 9,
    title: "אלכסנדר ינאי 24, באר שבע",
    price: 875000,
    rooms: 3,
    size: 60,
    floor: "1",
    image: "../images/apart9/image1.png",
    type: "למכירה",
    description: "למכירה נכס להשקעה בפריים לוקיישן 7 דקות מאוניברסיטת בן גוריון ובית חולים סורוקה! 3 חדרים+מרפסת 12מ\"ר דגם ייחודי באזור. רחוב אלכסנדר ינאי. מיקום מבוקש לסטודנטים, 2 דקות הליכה ממרכז מסחרי בצמוד לבית.",
    features: ["ממ\"ד", "מרפסת", "מעלית"],
    furniture: "מקרר ספה מכונת כביסה בסיס מיטה+מזנון תנור+גז שולחן לימודים+כסא משרד שידה לטלוויזיה 2 ארונות שולחן סלון 4 כיסאות",
    phoneNumber: "לא צויין",
    imageCount: 6,
    galleryFolder: "../images/apart9/"
  }  
];
// Function to render posts dynamically
function renderPosts(posts) {
  const propertiesContainer = document.querySelector('.properties-container');
  propertiesContainer.innerHTML = ''; // Clear existing apartments

  posts.forEach((post) => {
    const postHTML = `
      <div class="property-card-horizontal" id="apartment-${post.id}">
        <img class="property-image" src="${post.image}" alt="${post.title}">
        <div class="property-details">
          <h3>${post.title}</h3>
          <p><strong>₪${post.price}</strong></p>
          <p>${post.type} - דירה ${post.rooms} חדרים (${post.size} מ"ר)</p>
          <p>קומה ${post.floor}</p>
          <a href="../detailss/details.html?id=${post.id}" class="details-button">פרטים נוספים</a>

          <!-- Heart Button -->
          <button class="favorite-button" data-id="${post.id}">
            <i class="fa-solid fa-heart"></i>
          </button>

          <!-- Trash Can Button -->
          <div class="trash-container">
            <button class="trash-btn" data-id="${post.id}">
              🗑️
            </button>
            <div class="trash-options" id="trash-options-${post.id}" style="display: none;">
              <button class="mark-sold" data-id="${post.id}">Mark as Sold</button>
              <button class="mark-rented" data-id="${post.id}">Mark as Rented</button>
              <button class="delete-post" data-id="${post.id}">Delete Post</button>
            </div>
          </div>
        </div>
      </div>
    `;
    propertiesContainer.innerHTML += postHTML;
  });
  console.log(document.querySelectorAll('.favorite-button')); // Logs all favorite buttons
  console.log(document.querySelectorAll('.trash-btn')); // Logs all trash buttons
  
  // Attach event listeners dynamically after rendering
  attachEventListeners(); // Handles trash can functionality
  attachFavoriteListeners(); // Handles favorite functionality
}

// Attach Event Listeners for Trash Can Actions
function attachEventListeners() {
  // Toggle Trash Options
  document.querySelectorAll('.trash-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const apartmentId = button.getAttribute('data-id');
      const options = document.getElementById(`trash-options-${apartmentId}`);
      options.style.display = options.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Mark as Sold
  document.querySelectorAll('.mark-sold').forEach((button) => {
    button.addEventListener('click', () => {
      const apartmentId = button.getAttribute('data-id');
      const apartment = document.getElementById(`apartment-${apartmentId}`);
      apartment.style.backgroundColor = '#DFF2BF'; // Light green for sold
      alert(`Apartment ${apartmentId} marked as SOLD!`);
    });
  });

  // Mark as Rented
  document.querySelectorAll('.mark-rented').forEach((button) => {
    button.addEventListener('click', () => {
      const apartmentId = button.getAttribute('data-id');
      const apartment = document.getElementById(`apartment-${apartmentId}`);
      apartment.style.backgroundColor = '#FFF4E5'; // Light orange for rented
      alert(`Apartment ${apartmentId} marked as RENTED!`);
    });
  });

  // Delete Post
  document.querySelectorAll('.delete-post').forEach((button) => {
    button.addEventListener('click', () => {
      const apartmentId = button.getAttribute('data-id');
      const apartment = document.getElementById(`apartment-${apartmentId}`);
      apartment.remove(); // Remove the apartment from the DOM
      alert(`Apartment ${apartmentId} deleted!`);
    });
  });
}

// Attach Event Listeners for Favorite Button
function attachFavoriteListeners() {
  const favoriteButtons = document.querySelectorAll('.favorite-button');
  favoriteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const apartmentId = event.target.closest('button').getAttribute('data-id');
      const favoritesIcon = document.getElementById('favorites-icon');
      const favoritesDropdown = document.getElementById('favorites-dropdown');
      const favoritesCount = document.getElementById('favorites-count');

      // Add favorite to the dropdown and count
      if (!favorites.includes(apartmentId)) {
        favorites.push(apartmentId);
        favoritesCount.textContent = favorites.length;
        favoritesCount.style.display = 'inline-block';

        const favoriteItem = document.createElement('p');
        favoriteItem.textContent = `Apartment ID: ${apartmentId}`;
        favoritesDropdown.appendChild(favoriteItem);

        alert(`Apartment ${apartmentId} added to favorites.`);
      } else {
        alert(`Apartment ${apartmentId} is already in favorites.`);
      }
    });
  });
}

// Array to store favorites
const favorites = [];

// Render apartments when the page loads
document.addEventListener('DOMContentLoaded', () => {
  renderPosts(posts); // Ensure `posts` contains the list of apartments
});

export default posts; // שורת ייצוא

  