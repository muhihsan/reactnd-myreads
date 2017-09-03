import React, { Component } from 'react';
import Book from './Book';

class Books extends Component {
  render() {
    const { books, onUpdateBookshelf } = this.props;

    return (
      <ol className="books-grid">
        {books && books.map((book) => book && <Book key={book.id} book={book} onUpdateBookshelf={onUpdateBookshelf} />)}
      </ol>
    );
  }
}

export default Books;