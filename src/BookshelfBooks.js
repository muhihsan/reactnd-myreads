import React, { Component } from 'react';
import Book from './Book';

class BookshelfBooks extends Component {
  render() {
    const { books, onUpdateBookShelf } = this.props;

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => <Book key={book.id} book={book} onUpdateBookShelf={onUpdateBookShelf} />)}
        </ol>
      </div>
    );
  }
}

export default BookshelfBooks;