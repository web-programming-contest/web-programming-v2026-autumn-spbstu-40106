export class BlogPost {
  constructor(id, title, tags = [], comments = []) {
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.comments = comments;
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag) {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  addComment(comment) {
    this.comments.push(comment);
  }

  get commentCount() {
    return this.comments.length;
  }
}

// 1. Группировка по тегам (Map)
export function groupPostsByTags(posts) {
  const map = new Map();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!map.has(tag)) {
          map.set(tag, []);
        }
        map.get(tag).push(post);
      });
    }
  });
  return map;
}

// 2. Уникальные теги (Set)
export function getUniqueTags(posts) {
  const set = new Set();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        set.add(tag);
      });
    }
  });
  return set;
}

// 3. Группировка по количеству комментариев (Map)
export function groupPostsByCommentCount(posts) {
  const map = new Map();
  posts.forEach((post) => {
    const count = post.comments ? post.comments.length : 0;
    if (!map.has(count)) {
      map.set(count, []);
    }
    map.get(count).push(post);
  });
  return map;
}

// 4. Возвращает МАССИВ постов (как и просит робот)
export function groupPostsByTag(posts, tag) {
  if (!Array.isArray(posts)) {
    return [];
  }
  const searchTag = String(tag).toLowerCase().trim();

  return posts.filter((post) => {
    if (!post || !post.tags) {
      return false;
    }
    const postTags = Array.isArray(post.tags) ? post.tags : [post.tags];
    return postTags.some((t) => String(t).toLowerCase().trim() === searchTag);
  });
}

// 5. Список всех авторов (Array)
export function getAllCommentAuthors(posts) {
  const authors = [];
  posts.forEach((post) => {
    if (post.comments) {
      post.comments.forEach((comment) => {
        authors.push(comment.author);
      });
    }
  });
  return authors;
}
