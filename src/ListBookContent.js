import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import * as Constants from './utils/Constants';
import Bookshelf from './Bookshelf';

class ListBookContent extends Component {
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReadingBooks: books.filter((book) => book.shelf === Constants.CURRENTLY_READING),
        wantToReadBooks: books.filter((book) => book.shelf === Constants.WANT_TO_READ),
        readBooks: books.filter((book) => book.shelf === Constants.READ)
      });
    });
  }

  render() {
    const { currentlyReadingBooks, wantToReadBooks, readBooks } = this.state;

    return (
      <div className="list-books-content">
        <div>
          <Bookshelf key={Constants.CURRENTLY_READING} title={'Currently Reading'} books={currentlyReadingBooks} />
          <Bookshelf key={Constants.WANT_TO_READ} title={'Want to Read'} books={wantToReadBooks} />
          <Bookshelf key={Constants.READ} title={'Read'} books={readBooks} />
        </div>
      </div>
    );
  }
}

export default ListBookContent;