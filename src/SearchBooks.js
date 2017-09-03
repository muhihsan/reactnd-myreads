import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './utils/BooksAPI';
import SearchBooksResults from './SearchBooksResults';

class SearchBooks extends Component {
  constructor(props) {
    super (props);

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    books: [],
    searchValue: ''
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value.trim() }, this.searchBooks);
  }

  searchBooks = () => {
    BooksAPI.search(this.state.searchValue, 20).then((books) => {
      this.setState({ books: books });
    });
  }

  render() {
    const { books, searchValue } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'
          >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" value={searchValue} onChange={this.handleChange} placeholder="Search by title or author" />
          </div>
        </div>
        <SearchBooksResults books={books} />
      </div>
    );
  }
}

export default SearchBooks;