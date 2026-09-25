import {Order} from './model.js';

const STORAGE_KEY = 'orders';

const form = document.querySelector('[data-testid="entity-form"]');
const list = document.querySelector('[data-testid="entity-list"]');

let orders = [];

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function loadFromStorage() {
  const jsonString = localStorage.getItem(STORAGE_KEY);
  if (!jsonString) {
    return [];
  }
  try {
    const data = JSON.parse(jsonString);
    const result = [];
    for (const obj of data) {
      result.push(new Order(obj.orderId, obj.items, obj.status));
    }
    return result;
  } catch {
    return [];
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function render() {
  list.innerHTML = '';
  for (const order of orders) {
    const card = document.createElement('article');
    card.dataset.testid = 'entity-card';

    let itemsHtml = '';
    for (const item of order.items) {
      itemsHtml += `
            <li> ${item.name} — ${item.price} ₽
                <button type="button" class="delete-item" data-item-name="${item.name}">Удалить</button>
            </li>`;
    }

    card.innerHTML = `
            <h2>Заказ #${order.orderId}</h2>
            <p>Статус:
                <select class="status-select">
                    <option value="new" ${order.status === 'new' ? 'selected' : ''}>Новый</option>
                    <option value="paid" ${order.status === 'paid' ? 'selected' : ''}>Оплачен</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Отправлен</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Доставлен</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Отменён</option>
                </select>
            </p>
            <ul>${itemsHtml}</ul>
            <p>Итого: ${order.getTotal()} ₽</p>

            <form class="item-form">
                <input type="text" name="itemName" placeholder="Название товара" required />
                <input type="number" name="itemPrice" placeholder="Цена" min="0" required />
                <button type="submit">Добавить товар</button>
            </form>
            <button data-testid="delete-entity" type="button">Удалить заказ</button>
        `;

    const statusSelect = card.querySelector('.status-select');
    statusSelect.addEventListener('change', async function () {
      await delay(100);
      order.status = statusSelect.value;
      saveToStorage();
      render();
    });

    const deleteBtn = card.querySelector('[data-testid="delete-entity"]');
    deleteBtn.addEventListener('click', async function () {
      await delay(100);
      const result = [];
      for (const o of orders) {
        if (o.orderId !== order.orderId) {
          result.push(o);
        }
      }
      orders = result;
      saveToStorage();
      render();
    });

    const itemForm = card.querySelector('.item-form');
    itemForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const formData = new FormData(itemForm);
      const name = formData.get('itemName');
      const price = Number(formData.get('itemPrice'));

      await delay(100);

      order.addItem({name, price});
      saveToStorage();
      render();
    });

    const deleteItemBtns = card.querySelectorAll('.delete-item');
    for (const btn of deleteItemBtns) {
      btn.addEventListener('click', async function () {
        const itemName = btn.dataset.itemName;
        await delay(100);
        order.removeItem(itemName);
        saveToStorage();
        render();
      });
    }

    list.appendChild(card);
  }
}

form.addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const orderId = Number(formData.get('orderId'));
  const status = formData.get('status');

  for (const o of orders) {
    if (o.orderId === orderId) {
      return;
    }
  }

  await delay(100);
  orders.push(new Order(orderId, [], status));
  saveToStorage();
  render();
  form.reset();
});

orders = loadFromStorage();
render();
