import React from 'react';

const STORAGE_KEY = 'lab5-chat-messages';

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString('ru-RU');
}

export default function App() {
  const [messages, setMessages] = React.useState(loadMessages);
  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  function handleSend(event) {
    event.preventDefault();
    const author = name.trim();
    const content = text.trim();

    if (!author || !content) {
      return;
    }

    const message = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      author,
      text: content,
      createdAt: Date.now(),
    };

    setMessages((previous) => [...previous, message]);
    setText('');
  }

  function handleClear() {
    setMessages([]);
  }

  return (
    <main className="chat-app" data-testid="app">
      <h1 className="chat-title">Простой чат</h1>

      <form className="chat-form" onSubmit={handleSend}>
        <label className="chat-field">
          Имя
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ваше имя"
            data-testid="chat-name"
          />
        </label>

        <label className="chat-field">
          Сообщение
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Введите сообщение"
            data-testid="chat-message"
          />
        </label>

        <div className="chat-actions">
          <button type="submit" data-testid="chat-send">
            Отправить
          </button>
          <button
            type="button"
            className="chat-clear"
            onClick={handleClear}
            data-testid="chat-clear"
          >
            Очистить чат
          </button>
        </div>
      </form>

      <ul className="chat-history" data-testid="chat-history">
        {messages.map((message) => (
          <li className="chat-item" key={message.id} data-testid="chat-item">
            <div className="chat-meta">
              <span className="chat-author">{message.author}</span>
              <time className="chat-time">{formatDate(message.createdAt)}</time>
            </div>
            <p className="chat-text">{message.text}</p>
          </li>
        ))}
      </ul>

      {messages.length === 0 && (
        <p className="chat-empty">Сообщений пока нет</p>
      )}
    </main>
  );
}
