import React, { Component } from 'react';
import Books from './Books';

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