import React, { Component } from 'react';
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      books {
        title
      }
    }
  }
`;

class User extends Component {
  state = { user: null, show: false }

  async toggleShow(client) {
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
      <ApolloConsumer>
        {client => (
          <React.Fragment>
            <button className="btn btn-light float-right" onClick={() => this.toggleShow(client)}>
              {this.state.show ? 'Hide' : 'Show'} {this.props.user.booksCount} books
            </button>
            {this.state.user && this.state.show && <ul className="list-group mt-4">
              {this.state.user.books.map((b, i) =>
                <li className="list-group-item" key={`book-${i}`}>{b.title}</li>
              )}
            </ul>}
          </React.Fragment>
        )}
      </ApolloConsumer>
    )
  }
}

export default User;
