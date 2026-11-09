import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
import princeCover from '../assets/prince.jpg';
import prideCover from '../assets/pride.jpg';
import sherlockCover from '../assets/sherlock.jpg';

const books = [
  {
    id: 1,
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    rating: 4.9,
    price: 450,
    description:
      'История о маленьком путешественнике, дружбе, любви и важных жизненных ценностях.',
    cover: princeCover,
  },
  {
    id: 2,
    title: 'Гордость и предубеждение',
    author: 'Джейн Остин',
    rating: 4.8,
    price: 560,
    description:
      'Роман о любви, семейных отношениях и преодолении предрассудков.',
    cover: prideCover,
  },
  {
    id: 3,
    title: 'Приключения Шерлока Холмса',
    author: 'Артур Конан Дойл',
    rating: 4.7,
    price: 700,
    description:
      'Сборник детективных историй о знаменитом сыщике и его расследованиях.',
    cover: sherlockCover,
  },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((current) => (current + 1) % books.length);
  };

  const previousSlide = () => {
    setCurrentSlide((current) => (current - 1 + books.length) % books.length);
  };

  const book = books[currentSlide];

  return (
    <div className="container">
      <header className="header">
        <h1>Книжный магазин</h1>
        <p>Подборка книг для чтения</p>
      </header>

      <section className="slider" aria-label="Слайдер книг">
        <article className="book-card" data-testid="book-slide">
          <img className="book-cover" src={book.cover} alt={book.title} />

          <div className="book-info">
            <h2>{book.title}</h2>
            <p className="author">{book.author}</p>
            <p className="rating">★ {book.rating} / 5</p>
            <p className="price">{book.price} ₽</p>
            <p className="description">{book.description}</p>
          </div>
        </article>

        <div className="slider-controls">
          <button
            type="button"
            data-testid="slide-previous"
            onClick={previousSlide}
          >
            Назад
          </button>

          <span data-testid="slide-indicator">
            {currentSlide + 1} / {books.length}
          </span>

          <button type="button" data-testid="slide-next" onClick={nextSlide}>
            Далее
          </button>
        </div>

        <div className="pagination" aria-label="Пагинация">
          {books.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-testid="slide-page"
              className={index === currentSlide ? 'active' : ''}
              aria-label={`Перейти к слайду ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : undefined}
              onClick={() => setCurrentSlide(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

createRoot(document.querySelector('[data-testid="app"]')).render(<App />);
