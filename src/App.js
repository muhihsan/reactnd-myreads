import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

/** Class representing a BooksApp component. */
class BooksApp extends React.Component {
  /**
   * Create a BooksApp component.
   * @param {object} props - The props value.
   */
  constructor(props) {
    super(props);
    this.updateBookshelf = this.updateBookshelf.bind(this);
  }

  /**
   * Set the state value.
   */
  state = {
    books: []
  }

  /**  */
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  /**  */
  componentDidMount = () => {
    this.getAllBooks();
  }

  /**
   *
   * @param {*} book - The book value.
   * @param {*} shelf -  The shelf value.
   */
  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() =>
      this.getAllBooks()
    );
  }

  /**  */
  render = () => {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <ListBooks {...(this.state)} onUpdateBookshelf={this.updateBookshelf} />
        } />
        <Route path="/search" render={() =>
          <SearchBooks myBooks={books} onUpdateBookshelf={this.updateBookshelf} />
        } />
      </div>
    );
  }
}

/**  */
export default BooksApp;