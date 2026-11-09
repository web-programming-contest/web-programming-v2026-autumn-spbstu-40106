import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import BookList from './components/BookList.jsx';
import './styles.css';

function App() {
  return (
    <div>
      <h1>Книжный магазин</h1>
      <BookList />
    </div>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
