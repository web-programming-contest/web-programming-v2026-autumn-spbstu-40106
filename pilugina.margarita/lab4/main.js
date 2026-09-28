import {Travel} from './model.js';

const savedTravels = JSON.parse(localStorage.getItem('travels')) || [];

let travels = savedTravels.map(
  (travel) =>
    new Travel(travel.id, travel.travelerName, travel.visitedCountries),
);

const entityForm = document.querySelector('[data-testid="entity-form"]');
const idInput = document.querySelector('#travel-id');
const nameInput = document.querySelector('#traveler-name');
const countryInput = document.querySelector('#country');
const addCountryButton = document.querySelector('#add-country');
const removeCountryButton = document.querySelector('#remove-country');
const removeTravelButton = document.querySelector('#remove-travel');
const travelList = document.querySelector('#travel-list');

function asyncOperation(callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, 300);
  });
}

function saveTravels() {
  localStorage.setItem('travels', JSON.stringify(travels));
}

async function deleteTravel(id) {
  await asyncOperation(() => {
    travels = travels.filter((travel) => travel.id !== id);
    saveTravels();
    renderTravels();
  });
}

function renderTravels() {
  travelList.innerHTML = '';

  if (travels.length === 0) {
    travelList.innerHTML = '<p class="empty-message">Путешествий пока нет</p>';
    return;
  }

  travels.forEach((travel) => {
    const card = document.createElement('div');
    card.classList.add('travel-card');
    card.dataset.testid = 'entity-card';
    card.dataset.entityId = String(travel.id);

    card.innerHTML = `
      <h2>${travel.travelerName}</h2>
      <p><strong>ID:</strong> ${travel.id}</p>
      <p><strong>Страны:</strong></p>
      <ul>
        ${
          travel.visitedCountries.length
            ? travel.visitedCountries
                .map((country) => `<li>${country}</li>`)
                .join('')
            : '<li>Нет посещённых стран</li>'
        }
      </ul>
      <p><strong>Количество стран:</strong> ${travel.visitedCount}</p>
      <button type="button" data-testid="delete-entity">Удалить</button>
    `;

    const deleteButton = card.querySelector('[data-testid="delete-entity"]');
    deleteButton.addEventListener('click', () => deleteTravel(travel.id));
    travelList.append(card);
  });
}

entityForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = Number(idInput.value);
  const travelerName = nameInput.value.trim();

  if (!id || !travelerName) {
    return;
  }

  if (travels.some((travel) => travel.id === id)) {
    alert('Путешествие с таким ID уже существует');
    return;
  }

  await asyncOperation(() => {
    travels.push(new Travel(id, travelerName));
    saveTravels();
    renderTravels();
  });

  entityForm.reset();
});

removeTravelButton.addEventListener('click', async () => {
  const id = Number(idInput.value);

  if (!id || !travels.some((travel) => travel.id === id)) {
    return;
  }

  await deleteTravel(id);
  idInput.value = '';
});

addCountryButton.addEventListener('click', async () => {
  const id = Number(idInput.value);
  const country = countryInput.value.trim();
  const travel = travels.find((item) => item.id === id);

  if (!travel || !country || travel.visitedCountries.includes(country)) {
    return;
  }

  await asyncOperation(() => {
    travel.addCountry(country);
    saveTravels();
    renderTravels();
  });

  countryInput.value = '';
});

removeCountryButton.addEventListener('click', async () => {
  const id = Number(idInput.value);
  const country = countryInput.value.trim();
  const travel = travels.find((item) => item.id === id);

  if (!travel || !country || !travel.visitedCountries.includes(country)) {
    return;
  }

  await asyncOperation(() => {
    travel.removeCountry(country);
    saveTravels();
    renderTravels();
  });

  countryInput.value = '';
});

renderTravels();
