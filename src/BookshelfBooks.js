import React, { Component } from 'react';
import Books from './Books';

class BookshelfBooks extends Component {
  render() {
    const { books, onUpdateBookshelf } = this.props;

    return (
      <div className="bookshelf-books">
        <Books books={books} onUpdateBookshelf={onUpdateBookshelf} />
      </div>
    );
  }
}

export default BookshelfBooks;