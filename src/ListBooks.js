import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const bookShelves = [
  { id: 'currentlyReading', name: 'Currently Reading' },
  { id: 'wantToRead', name: 'Want to Read' },
  { id: 'read', name: 'Read' },
];

const ListBooks = function ListBooks(props) {
  const myBooks = props.myBooks;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves.map(shelf => (
            <BookShelf
              key={shelf.id}
              id={shelf.id}
              books={myBooks.filter(book => book.shelf === shelf.id)}
              name={shelf.name}
              onBookShelfChange={props.onBookShelfChange}
            />
          ))}
        </div>
      </div>

      <div className="open-search">
        <Link
          to="/search"
          className="search-books"
        >Add a book</Link>
      </div>
    </div>
  );
};

ListBooks.propTypes = {
  myBooks: PropTypes.array,
  onBookShelfChange: PropTypes.func,
};

ListBooks.defaultProps = {
  myBooks: [],
};

export default ListBooks;
