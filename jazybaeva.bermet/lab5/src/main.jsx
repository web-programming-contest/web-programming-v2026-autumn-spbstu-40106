import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Добро пожаловать',
      text: 'Это ваша первая заметка.',
      tag: 'старт',
      date: new Date().toLocaleDateString(),
    },
  ]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tag, setTag] = useState('');
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState('');

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: title.trim() || 'Без названия',
      text: text.trim() || 'Пустая заметка',
      tag: tag.trim() || 'без тега',
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setTitle('');
    setText('');
    setTag('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const allTags = [...new Set(notes.map((n) => n.tag))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.text.toLowerCase().includes(search.toLowerCase());
    const matchesTag = filterTag ? note.tag === filterTag : true;
    return matchesSearch && matchesTag;
  });

  return (
    <main data-testid="app" className="app">
      <h1>Мои заметки</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-testid="note-title"
        />
        <textarea
          placeholder="Текст заметки"
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-testid="note-content"
        />
        <input
          type="text"
          placeholder="Тег (необязательно)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          data-testid="note-tag"
        />
        <button type="button" onClick={addNote} data-testid="note-add">
          Добавить заметку
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Поиск по заметкам..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="note-search"
        />
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          data-testid="filter-tag"
        >
          <option value="">Все теги</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="notes-list" data-testid="note-list">
        {filteredNotes.length === 0 && <p>Заметок пока нет.</p>}
        {filteredNotes.map((note) => (
          <div key={note.id} className="note-card" data-testid="note-item">
            <h3 data-testid="note-title">{note.title}</h3>
            <p data-testid="note-content">{note.text}</p>
            <div className="note-meta">
              <span className="tag">{note.tag}</span>
              <span>{note.date}</span>
            </div>
            <button
              type="button"
              onClick={() => deleteNote(note.id)}
              data-testid="delete-note"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
