import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfBooks from './BookshelfBooks';

/** Class representing Bookshelf component. */
class Bookshelf extends Component {
  /** Typechecking props passed into Bookshelf component. */
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  /** Render Bookshelf element. */
  render = () => {
    const { title, books, onUpdateBookshelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <BookshelfBooks books={books} onUpdateBookshelf={onUpdateBookshelf}  />
      </div>
    );
  }
}

/** Export Bookshelf component. */
export default Bookshelf;