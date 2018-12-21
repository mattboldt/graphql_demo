import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import UserQuery from "./UserQuery";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Hello World</h1>
          <UserQuery />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
