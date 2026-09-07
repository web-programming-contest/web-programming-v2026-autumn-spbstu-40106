import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const MOVIES = [
  {id: 1, title: 'Дюна: Часть вторая', poster: '🏜️'},
  {id: 2, title: 'Оппенгеймер', poster: '💥'},
  {id: 3, title: 'Интерстеллар', poster: '🌌'},
  {id: 4, title: 'Бегущий по лезвию 2049', poster: '🤖'},
];

function App() {
  const [view, setView] = useState('list');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setView('form');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newErrors = {};

    const name = fd.get('name') || '';
    if (name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать не менее 2 символов';
    }

    const email = fd.get('email') || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Любой допустимый формат электронной почты';
    }

    const phone = fd.get('phone') || '';
    const phoneRegex = /^\+\d+$/;
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Цифры, + в начале';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setView('success');
  };

  if (view === 'success') {
    return (
      <div className="container">
        <h2>Подтверждение бронирования</h2>
        <div className="success-card" data-testid="success-message">
          <p>
            Билеты на фильм <strong>«{selectedMovie?.title}»</strong> успешно
            забронированы!
          </p>
          <button className="primary-btn mt-15" onClick={() => setView('list')}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  if (view === 'form') {
    return (
      <div className="container">
        <h2>Бронирование: {selectedMovie?.title}</h2>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="booking-form"
          data-testid="booking-form"
        >
          <div className="form-group">
            <label>Имя *</label>
            <input
              name="name"
              type="text"
              placeholder="Иван"
              data-testid="booking-name"
            />
            {errors.name && (
              <span className="error" data-testid="error-name">
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              name="email"
              type="email"
              placeholder="test@test.ru"
              data-testid="booking-email"
            />
            {errors.email && (
              <span className="error" data-testid="error-email">
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Телефон *</label>
            <input
              name="phone"
              type="tel"
              placeholder="+79991234567"
              data-testid="booking-phone"
            />
            {errors.phone && (
              <span className="error" data-testid="error-phone">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Дата сеанса</label>
            <input name="date" type="date" />
          </div>

          <div className="form-group">
            <label>Время</label>
            <input name="time" type="time" />
          </div>

          <div className="form-group">
            <label>Количество билетов</label>
            <input name="count" type="number" min="1" defaultValue="1" />
          </div>

          <div className="form-group">
            <label>Тип билета</label>
            <select name="type">
              <option value="standard">Стандартный</option>
              <option value="vip">VIP</option>
            </select>
          </div>

          <div className="buttons">
            <button
              type="submit"
              className="primary-btn"
              data-testid="booking-submit"
            >
              Забронировать
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setView('list')}
            >
              Назад
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Афиша фильмов</h1>
      <div className="movie-grid">
        {MOVIES.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            data-testid="movie-card"
            onClick={() => handleSelectMovie(movie)}
          >
            <div className="poster">{movie.poster}</div>
            <h3>{movie.title}</h3>
            <button className="primary-btn">Выбрать сеанс</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
