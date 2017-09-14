import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = function BookShelf(props) {
  const { id, books, name } = props;

  return (
    <div key={id} className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book
              key={book.id}
              id={book.id}
              thumbnail={book.imageLinks.thumbnail}
              shelf={book.shelf}
              title={book.title}
              authors={book.authors}
              onBookShelfChange={props.onBookShelfChange}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  books: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.string,
  onBookShelfChange: PropTypes.func,
};

export default BookShelf;
