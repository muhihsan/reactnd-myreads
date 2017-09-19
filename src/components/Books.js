import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

/** Class representing Books component. */
class Books extends Component {
  /** Typechecking props passed into Books component. */
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      imageLinks: PropTypes.object
    })).isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired,
    lastUpdatedBook: PropTypes.object
  }

  /** Render Books element. */
  render = () => {
    const { books, onUpdateBookshelf, lastUpdatedBook } = this.props;

    return (
      <ol className="books-grid">
        {books && books.map((book) => book && <Book key={book.id} book={book} onUpdateBookshelf={onUpdateBookshelf} lastUpdatedBook={lastUpdatedBook} />)}
      </ol>
    );
  }
}

/** Export Books component. */
export default Books;