import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListBookContent from './ListBookContent';

class ListBooks extends Component {
  render() {
    const { books, onUpdateBookshelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <ListBookContent books={books} onUpdateBookshelf={onUpdateBookshelf} />
        <div className="open-search">
          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;