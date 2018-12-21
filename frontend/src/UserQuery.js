import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const UserQuery = () => (
  <Query
    query={gql`
      {
        users {
          id
          name
          email
          books {
            title
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <ul>
        {data.users.map((user) => {
          return <li key={user.id}>
            {user.name}'s books:
            <ul>
            {user.books.map((b, i) => {
              return <li key={`book-${i}`}>{b.title}</li>
            })}
            </ul>
          </li>
        })}
      </ul>
    }}
  </Query>
);

export default UserQuery;
