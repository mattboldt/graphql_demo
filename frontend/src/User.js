import React from 'react';
import { Query } from "react-apollo";
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

const User = ({ user }) => (
  <React.Fragment>
    <button onClick={() => this.loadUser(user)}>
      {user.booksCount} books
    </button>
    <Query query={GET_USER} variables={{ id: user.id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return <ul>
          {data.user.books.map((b, i) => {
            return <li key={`book-${i}`}>{b.title}</li>
          })}
        </ul>
      }}
    </Query>
  </React.Fragment>
);

export default User;
