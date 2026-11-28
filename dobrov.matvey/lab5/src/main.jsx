import React from 'react';
import {createRoot} from 'react-dom/client';
import {books} from './books.js';
import './styles.css';

const levels = [
  {field: 'author', label: 'Авторы'},
  {field: 'publisher', label: 'Издательства'},
  {field: 'genre', label: 'Жанры'},
];

function BookTreeLevel({entries, depth = 0, initiallyExpanded = true}) {
  const level = levels[depth];
  if (level === undefined) {
    return (
      <ul className="tree-level" aria-label="Книги" data-testid="tree-level">
        {entries.map(({id, title}) => (
          <li className="book" key={id}>
            {title}
          </li>
        ))}
      </ul>
    );
  }

  const groups = [...Map.groupBy(entries, (book) => book[level.field])];

  return (
    <ul
      className="tree-level"
      aria-label={level.label}
      data-testid="tree-level"
    >
      {groups.map(([label, group], index) => {
        const openByDefault = initiallyExpanded && index === 0;
        return (
          <li key={label}>
            <details data-testid="tree-branch" open={openByDefault}>
              <summary data-testid="tree-toggle">{label}</summary>
              <BookTreeLevel
                entries={group}
                depth={depth + 1}
                initiallyExpanded={openByDefault}
              />
            </details>
          </li>
        );
      })}
    </ul>
  );
}

function App() {
  return (
    <div className="catalog">
      <header className="catalog-header">
        <h1>Книжный каталог</h1>
        <p>Автор → Издательство → Жанр → Книга</p>
      </header>

      <section className="tree-panel" aria-labelledby="catalog-heading">
        <header className="tree-header">
          <h2 id="catalog-heading">Авторы</h2>
          <p>Всего книг: {books.length}</p>
        </header>
        <div data-testid="tree">
          <BookTreeLevel entries={books} />
        </div>
      </section>
    </div>
  );
}

createRoot(document.querySelector('[data-testid="app"]')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
