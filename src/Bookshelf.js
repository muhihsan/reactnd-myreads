import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfBooks from './BookshelfBooks';

class Bookshelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  render() {
    const { title, books, onUpdateBookshelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BookshelfBooks books={books} onUpdateBookshelf={onUpdateBookshelf}  />
      </div>
    );
  }
}

export default Bookshelf;