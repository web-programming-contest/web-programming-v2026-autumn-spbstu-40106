import {
  Travel,
  getUniqueCountries,
  findTravelsByCountry,
  groupTravelersByCountry,
  findTravelsAboveCountryCount,
} from './model.js';

const STORAGE_KEY = 'travels';

const entityList = document.getElementById('entity-list');
const travelForm = document.getElementById('travel-form');
const countryForm = document.getElementById('country-form');

let travels = [];

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    travels = [];
    return;
  }
  try {
    const data = JSON.parse(raw);
    travels = data.map(
      (item) => new Travel(item.id, item.travelerName, item.visitedCountries),
    );
  } catch {
    travels = [];
  }
}

function saveToStorage() {
  const data = travels.map((t) => ({
    id: t.id,
    travelerName: t.travelerName,
    visitedCountries: t.visitedCountries,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function asyncAction(action) {
  return new Promise((resolve) => {
    setTimeout(() => {
      action();
      saveToStorage();
      render();
      resolve();
    }, 300);
  });
}

function render() {
  entityList.innerHTML = '';

  if (travels.length === 0) {
    entityList.innerHTML = '<p>Пока нет путешествий.</p>';
    return;
  }

  for (const travel of travels) {
    const card = document.createElement('div');
    card.setAttribute('data-testid', 'entity-card');

    const title = document.createElement('h3');
    title.textContent = `${travel.travelerName} (ID: ${travel.id})`;

    const count = document.createElement('p');
    count.textContent = `Посещено стран: ${travel.visitedCount}`;

    const list = document.createElement('ul');
    for (const country of travel.visitedCountries) {
      const li = document.createElement('li');
      li.textContent = country;
      list.appendChild(li);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-testid', 'delete-entity');
    deleteBtn.textContent = 'Удалить путешествие';
    deleteBtn.addEventListener('click', () => {
      asyncAction(() => {
        travels = travels.filter((t) => t.id !== travel.id);
      });
    });

    card.append(title, count, list, deleteBtn);
    entityList.appendChild(card);
  }
}

travelForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(travelForm);
  const id = Number(formData.get('id'));
  const travelerName = String(formData.get('travelerName')).trim();

  if (!id || !travelerName) {
    return;
  }

  asyncAction(() => {
    const existing = travels.find((t) => t.id === id);
    if (existing) {
      existing.travelerName = travelerName;
    } else {
      travels.push(new Travel(id, travelerName, []));
    }
  }).then(() => travelForm.reset());
});

countryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(countryForm);
  const travelId = Number(formData.get('travelId'));
  const country = String(formData.get('country')).trim();

  if (!travelId || !country) {
    return;
  }

  const target = travels.find((t) => t.id === travelId);
  if (!target) {
    return;
  }

  asyncAction(() => {
    target.addCountry(country);
  }).then(() => countryForm.reset());
});

loadFromStorage();
render();

window.getUniqueCountries = getUniqueCountries;
window.findTravelsByCountry = findTravelsByCountry;
window.groupTravelersByCountry = groupTravelersByCountry;
window.findTravelsAboveCountryCount = findTravelsAboveCountryCount;
window.Travel = Travel;
