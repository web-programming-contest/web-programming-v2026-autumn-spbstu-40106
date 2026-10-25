import React from 'react';
import Rating from './Rating.jsx';

export default function Book({book}) {
  return (
    <article data-testid="book-card" className="book-card">
      <img
        className="book-cover"
        src={book.cover}
        alt={`Обложка книги ${book.title}`}
      />

      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <p className="book-description">{book.description}</p>
        <p className="book-price">Цена: {book.price} ₽</p>
        <Rating initialRating={book.rating} votes={book.votes} />
      </div>
    </article>
  );
}
