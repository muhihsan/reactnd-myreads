import React, { Component } from 'react';
import * as BooksAPI from './utils/BooksAPI';
import * as Constants from './utils/Constants';
import Bookshelf from './Bookshelf';

class ListBookContent extends Component {
  constructor(props) {
    super(props);

    this.updateBookShelf = this.updateBookShelf.bind(this);
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

  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(() =>
      this.getAllBooks()
    );
  }

  render() {
    const { currentlyReadingBooks, wantToReadBooks, readBooks } = this.state;

    return (
      <div className="list-books-content">
        <div>
          <Bookshelf key={Constants.CURRENTLY_READING} title={'Currently Reading'} books={currentlyReadingBooks} onUpdateBookShelf={this.updateBookShelf} />
          <Bookshelf key={Constants.WANT_TO_READ} title={'Want to Read'} books={wantToReadBooks} onUpdateBookShelf={this.updateBookShelf} />
          <Bookshelf key={Constants.READ} title={'Read'} books={readBooks} onUpdateBookShelf={this.updateBookShelf} />
        </div>
      </div>
    );
  }
}

export default ListBookContent;