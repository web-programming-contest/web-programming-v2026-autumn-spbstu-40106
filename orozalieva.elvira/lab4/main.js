import {BlogPost} from './model.js';

let posts = [];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function loadFromStorage() {
  const saved = localStorage.getItem('blogPosts');
  if (saved) {
    const parsed = JSON.parse(saved);
    posts = parsed.map((p) => new BlogPost(p.id, p.title, p.tags, p.comments));
  }
}

function saveToStorage() {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
}

function render() {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';

  posts.forEach((post) => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.setAttribute('data-testid', 'entity-card');

    const header = document.createElement('div');
    header.innerHTML = `<h2>${post.title} (ID: ${post.id})</h2>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить пост';
    deleteBtn.setAttribute('data-testid', 'delete-entity');

    deleteBtn.onclick = async () => {
      deleteBtn.disabled = true;
      await delay(300);
      posts = posts.filter((p) => p.id !== post.id);
      saveToStorage();
      render();
    };
    header.appendChild(deleteBtn);
    card.appendChild(header);

    const tagsDiv = document.createElement('div');
    post.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'tag';
      tagSpan.textContent = `${tag} `;

      const removeTagBtn = document.createElement('button');
      removeTagBtn.textContent = 'x';
      removeTagBtn.onclick = async () => {
        removeTagBtn.disabled = true;
        await delay(200);
        post.removeTag(tag);
        saveToStorage();
        render();
      };
      tagSpan.appendChild(removeTagBtn);
      tagsDiv.appendChild(tagSpan);
    });
    card.appendChild(tagsDiv);

    const tagForm = document.createElement('form');
    tagForm.innerHTML = `
      <input type="text" name="tag" placeholder="Новый тег" required>
      <button type="submit">Добавить тег</button>
    `;
    tagForm.onsubmit = async (e) => {
      e.preventDefault();
      const tag = tagForm.elements['tag'].value.trim();
      if (tag) {
        await delay(200);
        post.addTag(tag);
        saveToStorage();
        render();
      }
    };
    card.appendChild(tagForm);

    const commentsDiv = document.createElement('div');
    post.comments.forEach((c) => {
      const cDiv = document.createElement('div');
      cDiv.className = 'comment';
      cDiv.textContent = `${c.author}: ${c.text}`;
      commentsDiv.appendChild(cDiv);
    });
    card.appendChild(commentsDiv);

    const countDiv = document.createElement('div');
    countDiv.textContent = `Комментариев: ${post.commentCount}`;
    card.appendChild(countDiv);

    const commentForm = document.createElement('form');
    commentForm.innerHTML = `
      <input type="text" name="author" placeholder="Автор" required>
      <input type="text" name="text" placeholder="Текст" required>
      <button type="submit">Добавить комментарий</button>
    `;
    commentForm.onsubmit = async (e) => {
      e.preventDefault();
      const author = commentForm.elements['author'].value.trim();
      const text = commentForm.elements['text'].value.trim();
      if (author && text) {
        await delay(200);
        post.addComment({author, text});
        saveToStorage();
        render();
      }
    };
    card.appendChild(commentForm);

    container.appendChild(card);
  });
}

document.getElementById('add-post-form').onsubmit = async (e) => {
  e.preventDefault();
  const idInput = e.target.elements['id'];
  const titleInput = e.target.elements['title'];

  const idValue = Number(idInput.value);
  const title = titleInput.value.trim();

  if (title && !isNaN(idValue)) {
    idInput.disabled = true;
    titleInput.disabled = true;
    await delay(300);

    const newPost = new BlogPost(idValue, title);
    posts.push(newPost);

    saveToStorage();

    idInput.value = '';
    titleInput.value = '';
    idInput.disabled = false;
    titleInput.disabled = false;
    render();
  }
};

loadFromStorage();
render();
