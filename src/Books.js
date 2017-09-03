import React, { Component } from 'react';

class Books extends Component {
  render() {
    const { books, onUpdateBookShelf } = this.props;

    return (
      <ol className="books-grid">
        {books.map((book) => <Book key={book.id} book={book} onUpdateBookShelf={onUpdateBookShelf} />)}
      </ol>
    );
  }
}

export default Books;