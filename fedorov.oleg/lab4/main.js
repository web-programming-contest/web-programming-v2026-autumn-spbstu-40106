import { Product } from './model.js';

let products = [];

const saved = localStorage.getItem('products');
if (saved) {
  const parsed = JSON.parse(saved);
  products = parsed.map((p) => new Product(p.id, p.name, p.price, p.categories));
}

const listElement = document.querySelector('[data-testid="entity-list"]');
const formElement = document.querySelector('form[data-testid="entity-form"]');

function saveAndRender() {
  localStorage.setItem('products', JSON.stringify(products));
  renderList();
}

function renderList() {
  listElement.innerHTML = '';
  products.forEach((p) => {
    const card = document.createElement('div');
    card.setAttribute('data-testid', 'entity-card');
    card.className = 'card';
    card.innerHTML = `
      <h3>${p.name} (#${p.id})</h3>
      <p>Цена: ${p.price}</p>
      <p>Категории: ${p.categories.join(', ')}</p>
      <button data-testid="delete-entity" data-id="${p.id}">Удалить товар</button>
    `;
    listElement.appendChild(card);
  });
}

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);
  const id = Number(formData.get('id'));
  const name = formData.get('name');
  const price = Number(formData.get('price'));
  const categoriesStr = formData.get('categories');
  const categories = categoriesStr ? categoriesStr.split(',').map((c) => c.trim()) : [];

  setTimeout(() => {
    products.push(new Product(id, name, price, categories));
    saveAndRender();
    formElement.reset();
  }, 500);
});

listElement.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-testid') && e.target.getAttribute('data-testid') === 'delete-entity') {
    const id = Number(e.target.getAttribute('data-id'));
    setTimeout(() => {
      products = products.filter((p) => p.id !== id);
      saveAndRender();
    }, 500);
  }
});

renderList();