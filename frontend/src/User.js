import React, { Component } from 'react';
import { GET_USER } from './Queries';
import client from './ApolloClient';

class User extends Component {
  state = { user: null, show: false }

  async toggleShow() {
    if (this.state.user) {
      this.setState({ show: !this.state.show })
    } else {
      const { data } = await client.query({
        query: GET_USER,
        variables: { id: this.props.user.id }
      });

      this.setState({ user: data.user, show: true })
    }
  }

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-light float-right" onClick={() => this.toggleShow}>
          {this.state.show ? 'Hide' : 'Show'} {this.props.user.booksCount} books
        </button>
        {this.state.user && this.state.show && <ul className="list-group mt-4">
          {this.state.user.books.map((b, i) =>
            <li className="list-group-item" key={`book-${i}`}>{b.title}</li>
          )}
        </ul>}
      </React.Fragment>
    )
  }
}

export default User;
