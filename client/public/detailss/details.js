import posts from '../HomePage/posts.js';

// פונקציה לטעינת תמונות ממוספרות מתוך תיקייה
function loadGallery(folderPath, count) {
  const images = [];
  for (let i = 1; i <= count; i++) {
    const imagePath = `${folderPath}/image${i}.png`;
    images.push(imagePath);
  }
  console.log("Gallery Images:", images);
  return images;
}


// שליפת מזהה הדירה מה-URL
const urlParams = new URLSearchParams(window.location.search);
const postId = parseInt(urlParams.get('id'));

// חיפוש הדירה עם ה-ID המתאים
const post = posts.find(p => p.id === postId);

// בדיקה אם הדירה נמצאה
const detailsContainer = document.getElementById('details-container');
if (post) {
  // טעינת תמונות הגלריה
  const galleryImages = loadGallery(post.galleryFolder, post.imageCount);

  // יצירת הקרוסלה
  const carouselHTML = `
    <div class="carousel">
      <div class="carousel-images">
        ${galleryImages.map(image => `<img src="${image}" class="carousel-image">`).join('')}
      </div>
      <button class="carousel-button prev">❮</button>
      <button class="carousel-button next">❯</button>
    </div>
  `;

  // יצירת התוכן הדינמי
  detailsContainer.innerHTML = `
    <div class="property-details">
      <h1>${post.title}</h1>
      ${carouselHTML}
      <div class="details-box">
        <p><strong>מחיר:</strong> ₪${post.price}</p>
        <p><strong>חדרים:</strong> ${post.rooms}</p>
        <p><strong>שטח:</strong> ${post.size} מ"ר</p>
        <p><strong>קומה:</strong> ${post.floor}</p>
        <p><strong>תיאור:</strong> ${post.description}</p>
        <h3>מאפיינים נוספים:</h3>
        <ul>
          ${post.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <h3>ריהוט:</h3>
        <p>${post.furniture}</p>
        <!-- כפתור להצגת הטלפון -->
      <div class="phone-container">
        <button id="show-phone-button" class="phone-button">הצג את מספר הטלפון</button>
        <p id="phone-number" class="phone-number" style="display: none;">${post.phoneNumber}</p>
      </div>
      </div>
    </div>
  `;

  // הוספת פונקציונליות לקרוסלה
  const images = document.querySelectorAll('.carousel-image');
  const carouselImagesContainer = document.querySelector('.carousel-images');
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  let currentIndex = 0;

  // פונקציה לעדכון הקרוסלה
function updateCarousel() {
  images.forEach((img, index) => {
    img.style.display = index === currentIndex ? 'block' : 'none';
  });
}

// הוספת פונקציונליות לקרוסלה
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

 // הוספת מאזין לאירוע לחיצה על הכפתור
 document.getElementById('show-phone-button').addEventListener('click', function() {
  const phoneNumber = document.getElementById('phone-number');
  phoneNumber.style.display = 'block'; // מציג את המספר
  this.style.display = 'none'; // מסתיר את הכפתור
});

// עדכון ראשוני של הקרוסלה
updateCarousel();
} else {
  detailsContainer.innerHTML = '<p>דירה לא נמצאה.</p>';
}


