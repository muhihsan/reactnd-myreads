import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Books extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  render = () => {
    const { books, onUpdateBookshelf } = this.props;

    return (
      <ol className="books-grid">
        {books && books.map((book) => book && <Book key={book.id} book={book} onUpdateBookshelf={onUpdateBookshelf} />)}
      </ol>
    );
  }
}

export default Books;