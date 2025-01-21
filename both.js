let favoriteCount = 0;

function toggleFavorite(apartmentId) {
  const heartButton = document.querySelector(`#${apartmentId} .favorite-button`);
  const favoritesCountElement = document.getElementById('favorites-count');

  if (!heartButton.classList.contains('favorited')) {
    // Mark as favorited
    heartButton.classList.add('favorited');
    favoriteCount++;
    favoritesCountElement.style.display = 'block'; // Show the count
  } else {
    // Remove from favorites
    heartButton.classList.remove('favorited');
    favoriteCount--;
    if (favoriteCount === 0) {
      favoritesCountElement.style.display = 'none'; // Hide the count
    }
  }
  // Update the count text
  favoritesCountElement.textContent = favoriteCount;
}
