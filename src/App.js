import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateBookshelf = this.updateBookshelf.bind(this);
  }

  state = {
    books: []
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  componentDidMount = () => {
    this.getAllBooks();
  }

  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() =>
      this.getAllBooks()
    );
  }

  render = () => {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks books={books} onUpdateBookshelf={this.updateBookshelf} />
        } />
        <Route path='/search' render={() =>
          <SearchBooks myBooks={books} onUpdateBookshelf={this.updateBookshelf} />
        } />
      </div>
    );
  }
}

export default BooksApp;