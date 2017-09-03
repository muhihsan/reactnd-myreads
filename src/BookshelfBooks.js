import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

class BookshelfBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

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