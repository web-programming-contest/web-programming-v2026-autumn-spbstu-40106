import {Game} from './model.js';

const STORAGE_KEY = 'games';
const games = loadGames();

const list = document.querySelector('[data-testid="entity-list"]');
const form = document.querySelector('form[data-testid="entity-form"]');

function saveGames() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

function loadGames() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data).map(
    (game) => new Game(game.title, game.platforms, game.releaseYear),
  );
}

function addGameAsync(game) {
  return new Promise((resolve) => {
    setTimeout(() => {
      games.push(game);
      saveGames();
      render();
      resolve(game);
    }, 500);
  });
}

function deleteGameAsync(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      games.splice(index, 1);
      saveGames();
      render();
      resolve();
    }, 500);
  });
}

function addPlatformAsync(game, platform) {
  return new Promise((resolve) => {
    setTimeout(() => {
      game.addPlatform(platform);
      saveGames();
      render();
      resolve();
    }, 500);
  });
}

function removePlatformAsync(game, platform) {
  return new Promise((resolve) => {
    setTimeout(() => {
      game.removePlatform(platform);
      saveGames();
      render();
      resolve();
    }, 500);
  });
}

function render() {
  list.innerHTML = '';

  games.forEach((game, index) => {
    const card = document.createElement('div');

    card.dataset.testid = 'entity-card';
    card.className = 'card';
    card.innerHTML = `
      <h3>${game.title}</h3>
      <p>Год: ${game.releaseYear}</p>
      <p>Платформы: ${game.platforms.join(', ')}</p>
      <button type="button" class="add-platform">Добавить платформу</button>
      <button type="button" class="remove-platform">Удалить платформу</button>
      <button type="button" data-testid="delete-entity">Удалить игру</button>
    `;

    card.querySelector('[data-testid="delete-entity"]').onclick = () => {
      deleteGameAsync(index);
    };

    card.querySelector('.add-platform').onclick = () => {
      const platform = prompt('Введите платформу');

      if (platform) {
        addPlatformAsync(game, platform);
      }
    };

    card.querySelector('.remove-platform').onclick = () => {
      const platform = prompt('Введите платформу');

      if (platform) {
        removePlatformAsync(game, platform);
      }
    };

    list.append(card);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = form.elements.namedItem('title').value;
  const year = Number(form.elements.namedItem('releaseYear').value);
  const game = new Game(title, [], year);

  addGameAsync(game);
  form.reset();
});

render();
