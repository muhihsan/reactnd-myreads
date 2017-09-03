import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  render = () => {
    const { book, onUpdateBookshelf } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
            <BookshelfChanger book={book} onUpdateBookshelf={onUpdateBookshelf} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
      </li>
    );
  }
}

export default Book;