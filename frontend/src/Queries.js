import gql from "graphql-tag";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      booksCount
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      books {
        title
      }
    }
  }
`;

export const ADD_USER = gql`
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
