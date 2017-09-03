import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import * as Constants from './utils/Constants';
import Bookshelf from './Bookshelf';

class ListBookContent extends Component {
  constructor(props) {
    super(props);

    this.updateBookshelf = this.updateBookshelf.bind(this);
  }

  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: []
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReadingBooks: books.filter((book) => book.shelf === Constants.CURRENTLY_READING),
        wantToReadBooks: books.filter((book) => book.shelf === Constants.WANT_TO_READ),
        readBooks: books.filter((book) => book.shelf === Constants.READ)
      });
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  updateBookshelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() =>
      this.getAllBooks()
    );
  }

  render() {
    const { currentlyReadingBooks, wantToReadBooks, readBooks } = this.state;

    return (
      <div className="list-books-content">
        <div>
          <Bookshelf key={Constants.CURRENTLY_READING} title={'Currently Reading'} books={currentlyReadingBooks} onUpdateBookshelf={this.updateBookshelf} />
          <Bookshelf key={Constants.WANT_TO_READ} title={'Want to Read'} books={wantToReadBooks} onUpdateBookshelf={this.updateBookshelf} />
          <Bookshelf key={Constants.READ} title={'Read'} books={readBooks} onUpdateBookshelf={this.updateBookshelf} />
        </div>
      </div>
    );
  }
}

export default ListBookContent;