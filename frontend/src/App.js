import React, { Component } from 'react';
import './App.css';
import UsersIndex from "./UsersIndex";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Authors and their Books</h1>
        <UsersIndex />
      </div>
    );
  }
}

export default App;
