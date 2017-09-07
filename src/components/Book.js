import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger'

/** Class representing a Book component. */
class Book extends Component {
  /** Typechecking props passed into Book component. */
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.array,
      imageLinks: PropTypes.object
    }).isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  /** Render Book element. */
  render = () => {
    const { book } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
            <BookshelfChanger {...(this.props)} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
      </li>
    );
  }
}

/** Export Book component. */
export default Book;