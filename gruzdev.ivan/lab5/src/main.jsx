import React, {createContext, useContext, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const ThemeContext = createContext(null);

function getSavedTheme() {
  try {
    return localStorage.getItem('book-store-theme') === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function ThemeProvider({children}) {
  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    try {
      localStorage.setItem('book-store-theme', theme);
    } catch {
      // Приложение продолжает работать, если браузер запретил localStorage.
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme должен вызываться внутри ThemeProvider.');
  }

  return context;
}

const books = [
  {
    id: 1,
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    genre: 'Классика',
    price: 890,
    description: 'Роман о любви, свободе и загадочном визите в Москву.',
    cover: 'cover-wine',
    initials: 'ММ',
  },
  {
    id: 2,
    title: 'Пикник на обочине',
    author: 'Аркадий и Борис Стругацкие',
    genre: 'Научная фантастика',
    price: 740,
    description: 'Путешествие к Зоне, полной необъяснимых явлений.',
    cover: 'cover-forest',
    initials: 'ПО',
  },
  {
    id: 3,
    title: 'Цветы для Элджернона',
    author: 'Дэниел Киз',
    genre: 'Научная фантастика',
    price: 680,
    description: 'История Чарли Гордона, меняющая взгляд на интеллект и доброту.',
    cover: 'cover-blue',
    initials: 'ЦЭ',
  },
  {
    id: 4,
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    genre: 'Сказка-притча',
    price: 520,
    description: 'Тёплая история о дружбе, ответственности и важных вещах.',
    cover: 'cover-sand',
    initials: 'МП',
  },
  {
    id: 5,
    title: 'Норвежский лес',
    author: 'Харуки Мураками',
    genre: 'Современная проза',
    price: 810,
    description: 'Воспоминание о юности, первой любви и взрослении.',
    cover: 'cover-coral',
    initials: 'НЛ',
  },
  {
    id: 6,
    title: 'Вино из одуванчиков',
    author: 'Рэй Брэдбери',
    genre: 'Проза',
    price: 650,
    description: 'Лето, которое навсегда остаётся в памяти двенадцатилетнего Дугласа.',
    cover: 'cover-lilac',
    initials: 'ВО',
  },
];

function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      className="theme-toggle"
      type="button"
      data-testid="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Включить ${nextTheme === 'dark' ? 'тёмную' : 'светлую'} тему`}
      title={`Включить ${nextTheme === 'dark' ? 'тёмную' : 'светлую'} тему`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'light' ? '☾' : '☀'}
      </span>
      <span>{theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}</span>
    </button>
  );
}

function BookCard({book, index}) {
  return (
    <li className="book-item">
      <article className="book-card">
        <div
          className={`book-cover ${book.cover}`}
          role="img"
          aria-label={`Иллюстрация для книги «${book.title}»`}
        >
          <span className="book-cover__ornament" aria-hidden="true">
            ✳
          </span>
          <span className="book-cover__initials" aria-hidden="true">
            {book.initials}
          </span>
          <span className="book-cover__number" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="book-card__content">
          <p className="book-card__genre">{book.genre}</p>
          <h2 className="book-card__title">{book.title}</h2>
          <p className="book-card__author">{book.author}</p>
          <p className="book-card__description">{book.description}</p>
          <div className="book-card__footer">
            <span className="book-card__price">{book.price} ₽</span>
            <span className="book-card__availability">
              <span aria-hidden="true">●</span> В наличии
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}

function BookStore() {
  const {theme} = useTheme();

  return (
    <div className="store" data-theme={theme}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Лист — на главную">
          <span className="brand__mark" aria-hidden="true">л.</span>
          <span className="brand__name">лист</span>
        </a>
        <p className="site-header__note">книги для долгих вечеров</p>
        <ThemeToggle />
      </header>

      <main className="page-content" id="top">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow"><span aria-hidden="true">✳</span> Книжная лавка</p>
          <h1 id="page-title">Истории, которые<br />остаются с вами.</h1>
          <p className="intro__description">
            Собрали книги, к которым хочется возвращаться. Выберите свою следующую.
          </p>
          <div className="intro__meta">
            <span>Небольшая подборка</span>
            <span aria-hidden="true">·</span>
            <span>{books.length} книг</span>
          </div>
        </section>

        <section className="catalog" aria-labelledby="catalog-title">
          <div className="catalog__heading">
            <div>
              <p className="eyebrow">Тихие открытия</p>
              <h2 id="catalog-title">На книжной полке</h2>
            </div>
            <span className="catalog__count">01 — 0{books.length}</span>
          </div>
          <ul className="book-list" data-testid="book-list">
            {books.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <span>лист <span aria-hidden="true">✳</span> книжная лавка</span>
        <span>Найдите время для хорошей истории.</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BookStore />
    </ThemeProvider>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(<App />);

