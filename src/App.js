import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

/** Class representing a BooksApp component. */
class BooksApp extends React.Component {
  /**
   * Initialize a BooksApp component.
   * @param {object} props - The props value.
   */
  constructor(props) {
    super(props);
    this.updateBookshelf = this.updateBookshelf.bind(this);
  }

  /** Initialize the state value. */
  state = {
    books: []
  }

  /** Get all books then set the state value. */
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  /**
   * After BooksApp component has been mounted.
   * Get all books.
   */
  componentDidMount = () => {
    this.getAllBooks();
  }

  /**
   * Update a book shelf then get all books.
   * @param {object} book - The book value.
   * @param {string} shelf -  The shelf value.
   */
  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() =>
      this.getAllBooks()
    );
  }

  /** Render BooksApp element. */
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

/** Export BooksApp component. */
export default BooksApp;