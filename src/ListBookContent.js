import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Constants from './utils/Constants';
import Bookshelf from './Bookshelf';

class ListBookContent extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  render = () => {
    const { books, onUpdateBookshelf } = this.props;
    const currentlyReadingBooks = books.filter((book) => book.shelf === Constants.CURRENTLY_READING);
    const wantToReadBooks = books.filter((book) => book.shelf === Constants.WANT_TO_READ);
    const readBooks = books.filter((book) => book.shelf === Constants.READ);

    return (
      <div className="list-books-content">
        <div>
          <Bookshelf key={Constants.CURRENTLY_READING} title={'Currently Reading'} books={currentlyReadingBooks} onUpdateBookshelf={onUpdateBookshelf} />
          <Bookshelf key={Constants.WANT_TO_READ} title={'Want to Read'} books={wantToReadBooks} onUpdateBookshelf={onUpdateBookshelf} />
          <Bookshelf key={Constants.READ} title={'Read'} books={readBooks} onUpdateBookshelf={onUpdateBookshelf} />
        </div>
      </div>
    );
  }
}

export default ListBookContent;