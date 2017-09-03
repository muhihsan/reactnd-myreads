import React, { Component } from 'react';
import Book from './Book';

class BookshelfBooks extends Component {
  render() {
    const { books, onUpdateBookShelf } = this.props;

    return (
      <div className="bookshelf-books">
        <Books books={books} onUpdateBookShelf={onUpdateBookShelf} />
      </div>
    );
  }
}

export default BookshelfBooks;