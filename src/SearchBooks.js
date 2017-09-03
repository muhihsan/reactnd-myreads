import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBooksBar from './SearchBooksBar';
import SearchBooksResults from './SearchBooksResults';

class SearchBooks extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onUpdateBookshelf: PropTypes.func.isRequired
  }

  state = {
    books: []
  }

  setBooks = (books) => {
    this.setState({ books: books });
  }

  render = () => {
    const { books } = this.state;
    const { myBooks, onUpdateBookshelf } = this.props;

    myBooks.forEach((myBook) => {
      var book = books.find((book) => book.id === myBook.id);
      if (book) {
        book.shelf = myBook.shelf;
      }
    });

    return (
      <div className="search-books">
        <SearchBooksBar onSearchBooks={this.setBooks} />
        <SearchBooksResults books={books} onUpdateBookshelf={onUpdateBookshelf} />
      </div>
    );
  }
}

export default SearchBooks;