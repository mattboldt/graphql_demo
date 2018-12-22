import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import UsersIndex from "./UsersIndex";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Hello World</h1>
          <UsersIndex />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
