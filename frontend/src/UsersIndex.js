import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";

const GET_USERS = gql`
  query myQuery {
    users {
      id
      name
      email
      booksCount
    }
  }
`

const ADD_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
       user {
        id
        name
        email
        booksCount
      }
      errors
    }
  }
`;


class UsersIndex extends Component {
  state = { users: {} }

  addUser = (e, addUser, nameInput, emailInput) => {
    e.preventDefault();
    addUser({
      variables: {
        name: nameInput.value,
        email: emailInput.value
      }
    });
    nameInput.value = '';
    emailInput.value = '';
  }

  render() {
    let nameInput;
    let emailInput;

    return (
      <React.Fragment>
        <Mutation
          mutation={ADD_USER}
          update={(cache, { data: { addUser } }) => {
            const { users } = cache.readQuery({ query: GET_USERS });
            cache.writeQuery({
              query: GET_USERS,
              data: { users: users.concat([addUser]) }
            });
          }}>
          {addUser => (
            <div className="mt-2 mb-4">
              <form className="form-inline" onSubmit={(e) => this.addUser(e, addUser, nameInput, emailInput)}>
                <input placeholder="Name" className="form-control" ref={(node) => { nameInput = node; }} />
                <input placeholder="Email" className="form-control" ref={(node) => { emailInput = node; }} />
                <button type="submit" className="btn btn-primary">Add User</button>
              </form>
            </div>
          )}
        </Mutation>

        <Query query={GET_USERS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <ul className="list-group">
              {data.users.map((user) => {
                return <li key={user.id} className="list-group-item">
                  {user.name} <User user={user} />
                </li>
              })}
            </ul>
          }}
        </Query>
      </React.Fragment>
    )
  }
}

export default UsersIndex;

