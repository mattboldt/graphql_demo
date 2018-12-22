import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";

const USERS = gql`
  {
    users {
      id
      name
      email
      booksCount
    }
  }
`

class UsersIndex extends Component {
  state = { users: {} }

  loadUser(user) {
    let users = this.state.users;
    users[user.id] = user;
    this.setState({ users });
  }

  render() {
    return (
      <Query query={USERS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return <ul>
            {data.users.map((user) => {
              return <li key={user.id}>
                {user.name} -
                <button onClick={() => this.loadUser(user)}>
                  {user.booksCount} books
                </button>
                {this.state.users[user.id] && <User user={this.state.users[user.id]} />}
              </li>
            })}
          </ul>
        }}
      </Query>
    )
  }
}

export default UsersIndex;

