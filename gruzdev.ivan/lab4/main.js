import {Game} from './model.js';

const STORAGE_KEY = 'lab4-games';
const form = document.querySelector('[data-testid="entity-form"]');
const list = document.querySelector('[data-testid="entity-list"]');

const games = loadGames();

function loadGames() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  const parsed = JSON.parse(raw);
  return parsed.map(
    (item) => new Game(item.title, item.platforms, item.releaseYear),
  );
}

function saveGames() {
  const raw = games.map((game) => ({
    title: game.title,
    platforms: game.platforms,
    releaseYear: game.releaseYear,
  }));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
}

function addGameAsync(game) {
  return new Promise((resolve) => {
    setTimeout(() => {
      games.push(game);
      saveGames();
      resolve();
    }, 300);
  });
}

function removeGameAsync(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      games.splice(index, 1);
      saveGames();
      resolve();
    }, 300);
  });
}

function updatePlatformsAsync(index, action, platform) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'add') {
        games[index].addPlatform(platform);
      } else {
        games[index].removePlatform(platform);
      }
      saveGames();
      resolve();
    }, 300);
  });
}

function renderGames() {
  list.innerHTML = '';

  games.forEach((game, index) => {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.dataset.testid = 'entity-card';

    const title = document.createElement('h2');
    title.textContent = game.title;

    const year = document.createElement('p');
    year.textContent = `Год выпуска: ${game.releaseYear}`;

    const platformsList = document.createElement('p');
    platformsList.textContent = `Платформы: ${game.platforms.join(', ') || 'нет'}`;

    const addPlatformButton = document.createElement('button');
    addPlatformButton.textContent = 'Добавить платформу';
    addPlatformButton.addEventListener('click', () => {
      const platform = window.prompt('Введите название платформы:');
      if (platform) {
        updatePlatformsAsync(index, 'add', platform).then(renderGames);
      }
    });

    const removePlatformButton = document.createElement('button');
    removePlatformButton.textContent = 'Удалить платформу';
    removePlatformButton.addEventListener('click', () => {
      const platform = window.prompt('Введите платформу для удаления:');
      if (platform) {
        updatePlatformsAsync(index, 'remove', platform).then(renderGames);
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить игру';
    deleteButton.dataset.testid = 'delete-entity';
    deleteButton.addEventListener('click', () => {
      removeGameAsync(index).then(renderGames);
    });

    card.append(
      title,
      year,
      platformsList,
      addPlatformButton,
      removePlatformButton,
      deleteButton,
    );
    list.append(card);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get('title');
  const releaseYear = Number(formData.get('releaseYear'));
  const platformsInput = formData.get('platforms') || '';
  const platforms = platformsInput
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const game = new Game(title, platforms, releaseYear);

  addGameAsync(game).then(() => {
    form.reset();
    renderGames();
  });
});

renderGames();
