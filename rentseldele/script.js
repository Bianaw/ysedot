let currentAction = null;
let currentPostId = null;

function toggleTrashOptions() {
  const options = document.getElementById('trash-options');
  options.style.display = options.style.display === 'block' ? 'none' : 'block';
}

function showModal(action, postId) {
  currentAction = action;
  currentPostId = postId;

  const modal = document.getElementById('confirmation-modal');
  const message = document.getElementById('modal-message');

  if (action === 'sold') {
    message.textContent = 'Are you sure you want to mark this post as SOLD?';
  } else if (action === 'rented') {
    message.textContent = 'Are you sure you want to mark this post as RENTED?';
  }

  modal.style.display = 'flex';
  toggleTrashOptions(); // Hide trash options
}

function closeModal() {
  const modal = document.getElementById('confirmation-modal');
  modal.style.display = 'none';
}

function confirmAction() {
  const post = document.getElementById(currentPostId);

  if (currentAction === 'sold') {
    post.style.backgroundColor = '#DFF2BF'; // Light green for sold
    showNotification('Post marked as SOLD successfully!');
  } else if (currentAction === 'rented') {
    post.style.backgroundColor = '#FFF4E5'; // Light orange for rented
    showNotification('Post marked as RENTED successfully!');
  }

  closeModal();
}

function deletePost(postId) {
  const post = document.getElementById(postId);
  post.remove();
  showNotification('Post deleted successfully!');
  toggleTrashOptions(); // Hide trash options
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
