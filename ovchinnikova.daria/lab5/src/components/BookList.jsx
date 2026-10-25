import React from 'react';
import Book from './Book.jsx';
import coverWarAndPeace from '../../assets/war_and_peace.jpg';
import coverThreeInBoat from '../../assets/three_in_boat.jpg';
import coverMartinIden from '../../assets/martin_iden.jpg';

const BOOKS = [
  {
    id: 1,
    title: 'Война и мир',
    cover: coverWarAndPeace,
    rating: 4.5,
    votes: 10,
    description:
      'Роман-эпопея Л.Н.Толстого описывает русское общество в эпоху наполеоновских войн.',
    price: 1200,
  },
  {
    id: 2,
    title: 'Трое в лодке, не считая собаки',
    cover: coverThreeInBoat,
    rating: 4.9,
    votes: 15,
    description:
      'Лондон, конец XIX века. Друзья-холостяки Джи, Харрис и Джордж решают отправиться в путешествие на лодке по Темзе, прихватив с собой собачку Монморенси. Юмористическая повесть английского писателя Джерома К. Джерома.',
    price: 900,
  },
  {
    id: 3,
    title: 'Мартин Иден',
    cover: coverMartinIden,
    rating: 4.8,
    votes: 20,
    description:
      'Один из самых известных романов американского писателя Джека Лондона. Впервые опубликован в 1908–1909 годах в журнале The Pacific Monthly.',
    price: 1100,
  },
];

export default function BookList() {
  return (
    <div className="book-list">
      {BOOKS.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}
