import React, { Component } from 'react';
import Book from './Book';

class Books extends Component {
  render() {
    const { books, onUpdateBookShelf } = this.props;

    return (
      <ol className="books-grid">
        {books && books.map((book) => <Book key={book.id} book={book} onUpdateBookShelf={onUpdateBookShelf} />)}
      </ol>
    );
  }
}

export default Books;