import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfBooks from './BookshelfBooks';

/** Class representing Bookshelf component. */
class Bookshelf extends Component {
  /** Typechecking props passed into Bookshelf component. */
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    lastUpdatedBook: PropTypes.object
  }

  /** Render Bookshelf element. */
  render = () => {
    const { title, books, onUpdateBookshelf, lastUpdatedBook } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BookshelfBooks books={books} onUpdateBookshelf={onUpdateBookshelf} lastUpdatedBook={lastUpdatedBook}  />
      </div>
    );
  }
}

/** Export Bookshelf component. */
export default Bookshelf;