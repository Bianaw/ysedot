import { toggleTrashOptions, markPost, deletePost } from './trashCan';

// Set up a mock DOM for testing
document.body.innerHTML = `
  <div id="post-1" style="background-color: white;">
    <div class="trash-options" id="trash-options" style="display: none;">
      <button id="mark-sold" onclick="markPost('post-1', 'sold')">Mark as Sold</button>
      <button id="mark-rented" onclick="markPost('post-1', 'rented')">Mark as Rented</button>
      <button id="delete-post" onclick="deletePost('post-1')">Delete Post</button>
    </div>
  </div>
`;

describe('Trash Can Functionality', () => {
  test('toggleTrashOptions: should toggle the visibility of trash options', () => {
    const optionsId = 'trash-options';
    const options = document.getElementById(optionsId);

    // Initially hidden
    expect(options.style.display).toBe('none');

    // Call toggle function
    toggleTrashOptions(optionsId);
    expect(options.style.display).toBe('block');

    // Call toggle function again
    toggleTrashOptions(optionsId);
    expect(options.style.display).toBe('none');
  });

  test('markPost: should mark the post as sold and hide options', () => {
    const postId = 'post-1';
    const post = document.getElementById(postId);

    // Call the function to mark as sold
    markPost(postId, 'sold');

    // Verify background color change
    expect(post.style.backgroundColor).toBe('rgb(223, 242, 191)'); // Light green

    // Verify options are hidden
    const options = post.querySelector('.trash-options');
    expect(options.style.display).toBe('none');
  });

  test('markPost: should mark the post as rented and hide options', () => {
    const postId = 'post-1';
    const post = document.getElementById(postId);

    // Call the function to mark as rented
    markPost(postId, 'rented');

    // Verify background color change
    expect(post.style.backgroundColor).toBe('rgb(255, 244, 229)'); // Light orange

    // Verify options are hidden
    const options = post.querySelector('.trash-options');
    expect(options.style.display).toBe('none');
  });

  test('deletePost: should remove the post from the DOM', () => {
    const postId = 'post-1';

    // Verify post exists
    expect(document.getElementById(postId)).not.toBeNull();

    // Call delete function
    deletePost(postId);

    // Verify post is removed
    expect(document.getElementById(postId)).toBeNull();
  });
});
