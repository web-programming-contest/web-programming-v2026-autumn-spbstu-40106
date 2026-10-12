import {Game} from './model.js';

const STORAGE_KEY = 'lab4-games';
const DELAY_MS = 300;

const list = document.querySelector('[data-testid="entity-list"]');
const form = document.querySelector('form[data-testid="entity-form"]');

function delay(action) {
  return new Promise((resolve) => {
    setTimeout(() => {
      action();
      resolve();
    }, DELAY_MS);
  });
}

function loadGames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw).map(
      (item) => new Game(item.title, item.platforms, item.releaseYear),
    );
  } catch {
    return [];
  }
}

let games = loadGames();

function saveGames() {
  const data = games.map((game) => ({
    title: game.title,
    platforms: game.platforms,
    releaseYear: game.releaseYear,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function createButton(text, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = text;
  button.addEventListener('click', onClick);
  return button;
}

function createCard(game) {
  const card = document.createElement('article');
  card.className = 'game-card';
  card.dataset.testid = 'entity-card';

  const title = document.createElement('h2');
  title.className = 'game-title';
  title.textContent = game.title;

  const year = document.createElement('p');
  year.textContent = `Год выпуска: ${game.releaseYear}`;

  const platforms = document.createElement('p');
  platforms.textContent = `Платформы (${game.platformCount}): ${
    game.platforms.length > 0 ? game.platforms.join(', ') : 'нет'
  }`;

  const platformInput = document.createElement('input');
  platformInput.type = 'text';
  platformInput.className = 'platform-input';
  platformInput.placeholder = 'Платформа, например PC';
  platformInput.setAttribute('aria-label', 'Название платформы');

  const addPlatformButton = createButton('Добавить платформу', async () => {
    const platform = platformInput.value.trim();
    if (!platform) {
      return;
    }
    await delay(() => {
      game.addPlatform(platform);
      saveGames();
    });
    render();
  });

  const removePlatformButton = createButton('Удалить платформу', async () => {
    const platform = platformInput.value.trim();
    if (!platform) {
      return;
    }
    await delay(() => {
      game.removePlatform(platform);
      saveGames();
    });
    render();
  });

  const deleteButton = createButton('Удалить игру', async () => {
    await delay(() => {
      games = games.filter((item) => item !== game);
      saveGames();
    });
    render();
  });
  deleteButton.dataset.testid = 'delete-entity';

  const actions = document.createElement('div');
  actions.className = 'card-actions';
  actions.append(
    platformInput,
    addPlatformButton,
    removePlatformButton,
    deleteButton,
  );

  card.append(title, year, platforms, actions);
  return card;
}

function render() {
  list.replaceChildren(...games.map(createCard));
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = String(formData.get('title') ?? '').trim();
  const releaseYear = Number(formData.get('releaseYear'));

  if (!title || !Number.isFinite(releaseYear)) {
    return;
  }

  await delay(() => {
    games.push(new Game(title, [], releaseYear));
    saveGames();
  });

  form.reset();
  render();
});

render();
