import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Books extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      imageLinks: PropTypes.object
    })).isRequired,
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