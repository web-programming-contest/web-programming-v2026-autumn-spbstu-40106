import {Travel} from './model.js';

const STORAGE_KEY = 'web-lab4-variant15-travels';
const OPERATION_DELAY = 350;

const travelForm = document.querySelector('#travel-form');
const idInput = document.querySelector('#travel-id');
const nameInput = document.querySelector('#traveler-name');
const travelList = document.querySelector('#travel-list');
const cardTemplate = document.querySelector('#travel-card-template');
const emptyMessage = document.querySelector('#empty-message');
const totalCount = document.querySelector('#total-count');
const message = document.querySelector('#message');

let busy = false;
let travels = loadTravels();

function showMessage(text, error = false) {
  message.textContent = text;
  message.classList.toggle('error', error);
}

function loadTravels() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return [];
    }

    const data = JSON.parse(saved);
    if (!Array.isArray(data)) {
      throw new Error('Некорректный список путешествий.');
    }

    const ids = new Set();
    return data.map((item) => {
      if (
        !item ||
        !Number.isSafeInteger(item.id) ||
        item.id < 1 ||
        ids.has(item.id) ||
        typeof item.travelerName !== 'string' ||
        item.travelerName.trim() === '' ||
        !Array.isArray(item.visitedCountries) ||
        !item.visitedCountries.every(
          (country) => typeof country === 'string' && country.trim() !== '',
        )
      ) {
        throw new Error('Некорректные данные путешествия.');
      }

      ids.add(item.id);
      return new Travel(item.id, item.travelerName, item.visitedCountries);
    });
  } catch {
    showMessage(
      'Не удалось восстановить сохранённый список путешествий.',
      true,
    );
    return [];
  }
}

function saveTravels() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(travels));
    return true;
  } catch {
    return false;
  }
}

function setBusy(value) {
  busy = value;
  travelList.setAttribute('aria-busy', String(value));
  document.querySelectorAll('input, button').forEach((element) => {
    element.disabled = value;
  });
}

// Откладывает изменение списка и возвращает Promise.
function delayedChange(action) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        action();
        resolve();
      } catch (error) {
        reject(error);
      }
    }, OPERATION_DELAY);
  });
}

// Общий порядок: изменение → сохранение → обновление карточек.
async function applyChange(action, successMessage) {
  if (busy) {
    return;
  }

  setBusy(true);
  showMessage('Выполняется операция…');

  try {
    await delayedChange(action);
    const saved = saveTravels();
    renderTravels();
    showMessage(
      saved
        ? successMessage
        : `${successMessage} Не удалось сохранить изменения в браузере.`,
      !saved,
    );
  } catch (error) {
    showMessage(error.message, true);
  } finally {
    setBusy(false);
  }
}

function createCard(travel) {
  const card = cardTemplate.content.firstElementChild.cloneNode(true);
  card.querySelector('.travel-id').textContent = `ID: ${travel.id}`;
  card.querySelector('.traveler-name').textContent = travel.travelerName;
  card.querySelector('.visited-count').textContent = travel.visitedCount;

  const countryList = card.querySelector('.country-list');
  if (travel.visitedCount === 0) {
    const item = document.createElement('li');
    item.className = 'no-countries';
    item.textContent = 'Пока нет посещённых стран';
    countryList.append(item);
  }

  for (const country of travel.visitedCountries) {
    const item = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = country;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'delete-country danger';
    button.textContent = 'Удалить страну';
    button.setAttribute('aria-label', `Удалить страну ${country}`);
    button.addEventListener('click', () => {
      applyChange(() => travel.removeCountry(country), 'Страна удалена.');
    });

    item.append(title, button);
    countryList.append(item);
  }

  const countryForm = card.querySelector('.country-form');
  const countryInput = card.querySelector('.country-input');
  countryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const country = countryInput.value.trim();

    applyChange(() => {
      if (country === '') {
        throw new Error('Введите название страны.');
      }
      if (travel.visitedCountries.includes(country)) {
        throw new Error('Эта страна уже есть в списке путешественника.');
      }
      travel.addCountry(country);
    }, 'Страна добавлена.');
  });

  card.querySelector('.delete-travel').addEventListener('click', () => {
    applyChange(() => {
      travels = travels.filter((item) => item.id !== travel.id);
    }, 'Путешествие удалено.');
  });

  return card;
}

function renderTravels() {
  travelList.replaceChildren();
  for (const travel of travels) {
    travelList.append(createCard(travel));
  }
  emptyMessage.hidden = travels.length > 0;
  totalCount.textContent = travels.length;
}

travelForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = Number(idInput.value);
  const travelerName = nameInput.value.trim();

  applyChange(() => {
    if (!Number.isSafeInteger(id) || id < 1) {
      throw new Error('ID должен быть целым положительным числом.');
    }
    if (travelerName === '') {
      throw new Error('Введите имя путешественника.');
    }
    if (travels.some((travel) => travel.id === id)) {
      throw new Error('Путешествие с таким ID уже существует.');
    }

    travels.push(new Travel(id, travelerName));
    travelForm.reset();
  }, 'Путешествие добавлено.');
});

renderTravels();
