import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import User from "./User";

const GET_USERS = gql`
  {
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

  render() {
    let nameInput;
    let emailInput;

    return (
      <React.Fragment>
        <Query query={GET_USERS}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return <ul>
              {data.users.map((user) => {
                return <li key={user.id}>
                  {user.name} -

                  <User user={user} />
                </li>
              })}
            </ul>
          }}
        </Query>

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
            <div>
              <form onSubmit={(e) => {
                e.preventDefault();
                addUser({
                  variables: {
                    name: nameInput.value,
                    email: emailInput.value
                  }
                });
              }}>
                <input ref={(node) => { nameInput = node; }} />
                <input ref={(node) => { emailInput = node; }} />
                <button type="submit">Add User</button>
              </form>
            </div>
          )}
        </Mutation>
      </React.Fragment>
    )
  }
}

export default UsersIndex;

