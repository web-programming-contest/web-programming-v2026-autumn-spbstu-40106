import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

// Цены храним в копейках — целых числах.
// Это позволяет точно рассчитывать денежные суммы.
const BOOKS = [
  {
    id: 1,
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    price: 45000,
  },
  {
    id: 2,
    title: 'Алиса в Стране чудес',
    author: 'Льюис Кэрролл',
    price: 62000,
  },
  {
    id: 3,
    title: 'Приключения Шерлока Холмса',
    author: 'Артур Конан Дойл',
    price: 79000,
  },
  {
    id: 4,
    title: 'Двадцать тысяч лье под водой',
    author: 'Жюль Верн',
    price: 58000,
  },
];

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

function formatPrice(kopecks) {
  return currencyFormatter.format(kopecks / 100);
}

// Карточка книги получает данные и обработчик через props.
function BookCard({book, onAdd}) {
  return (
    <article className="book-card" data-testid="book-card">
      <p className="book-author">{book.author}</p>
      <h3>{book.title}</h3>
      <p className="book-price">{formatPrice(book.price)}</p>

      <button
        type="button"
        data-testid="cart-add"
        onClick={() => onAdd(book.id)}
        aria-label={`Добавить в корзину: ${book.title}`}
      >
        В корзину
      </button>
    </article>
  );
}

// Одна позиция корзины.
function CartItem({book, quantity, onDecrease, onIncrease, onRemove}) {
  return (
    <li className="cart-item" data-testid="cart-item">
      <div className="cart-description">
        <h3>{book.title}</h3>
        <p>{formatPrice(book.price)} за книгу</p>
      </div>

      <div className="quantity-controls">
        <button
          type="button"
          onClick={() => onDecrease(book.id)}
          aria-label={`Уменьшить количество: ${book.title}`}
        >
          −1
        </button>
        <span>Количество: {quantity}</span>

        <button
          type="button"
          onClick={() => onIncrease(book.id)}
          aria-label={`Увеличить количество: ${book.title}`}
        >
          +1
        </button>
      </div>

      <p className="item-total">{formatPrice(book.price * quantity)}</p>

      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(book.id)}
        aria-label={`Удалить из корзины: ${book.title}`}
      >
        Удалить
      </button>
    </li>
  );
}

function App() {
  // В состоянии хранятся только ID книг и их количество.
  const [cart, setCart] = useState([]);

  // Функциональное обновление использует актуальное состояние.
  // Исходный массив и его объекты не изменяем.
  function addBook(bookId) {
    setCart((currentCart) => {
      const alreadyAdded = currentCart.some((item) => item.bookId === bookId);

      if (alreadyAdded) {
        return currentCart.map((item) =>
          item.bookId === bookId
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }

      return [...currentCart, {bookId, quantity: 1}];
    });
  }

  // Уменьшаем количество на один.
  // Если количество стало нулевым, убираем позицию.
  function decreaseBook(bookId) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.bookId === bookId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // Удаляем всю позицию независимо от количества экземпляров.
  function removeBook(bookId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.bookId !== bookId),
    );
  }

  // Соединяем состояние корзины с данными каталога.
  const cartItems = cart.map((item) => ({
    ...item,
    book: BOOKS.find((book) => book.id === item.bookId),
  }));

  // Сумма вычисляется заново при изменении состояния.
  // Отдельное состояние для суммы не требуется.
  const total = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0,
  );

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="page" data-testid="app">
      <header className="page-header">
        <p className="eyebrow">Лабораторная работа №5 · Вариант 39</p>
        <h1>Книжная полка</h1>
        <p>Выбирай книги и собирай свою библиотеку.</p>
      </header>

      <section aria-labelledby="catalog-heading">
        <h2 id="catalog-heading">Каталог книг</h2>

        <div className="book-grid">
          {BOOKS.map((book) => (
            <BookCard key={book.id} book={book} onAdd={addBook} />
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section className="cart-section" aria-labelledby="cart-heading">
        <h2 id="cart-heading">Корзина</h2>

        {cartItems.length === 0 && (
          <p className="empty-message">
            Корзина пока пуста. Добавь книгу из каталога.
          </p>
        )}

        <ul className="cart-list" data-testid="cart-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.bookId}
              book={item.book}
              quantity={item.quantity}
              onIncrease={addBook}
              onDecrease={decreaseBook}
              onRemove={removeBook}
            />
          ))}
        </ul>

        <div className="cart-summary" aria-live="polite">
          <p>Всего книг: {totalQuantity}</p>
          <p className="cart-total" data-testid="cart-total">
            Итого: {formatPrice(total)}
          </p>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
