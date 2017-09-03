import React, { Component } from 'react';
import Bookshelf from './Bookshelf';

class ListBookContent extends Component {
  render() {
    return (
      <div className="list-books-content">
        <div>
          <Bookshelf title={'Currently Reading'} />
          <Bookshelf title={'Want to Read'} />
          <Bookshelf title={'Read'} />
        </div>
      </div>
    );
  }
}

export default ListBookContent;