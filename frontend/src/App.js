import React, { Component } from 'react';
import './App.css';
import UsersIndex from "./UsersIndex";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
        <UsersIndex />
      </div>
    );
  }
}

export default App;
