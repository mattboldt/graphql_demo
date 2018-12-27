import React, { Component } from 'react';
import client from './ApolloClient';
import { ADD_USER } from './Queries';

class AddUser extends Component {
  state = { name: '', email: '' }

  async addUser(e) {
    e.preventDefault();

    const { data } = await client.mutate({
      mutation: ADD_USER,
      variables: { name: this.state.name, email: this.state.email }
    });

    this.setState({ name: '', email: '' });
    this.props.onUserAdded(data.createUser.user);
  }

  get submitDisabled() {
    return this.state.name.length === 0 || this.state.email.length === 0;
  }

  render() {
    return <form onSubmit={(e) => this.addUser(e)}>
      <div className="form-row">
        <div className="form-group col-5">
          <input
            placeholder="Name"
            className="form-control"
            onChange={(e) => { this.setState({ name: e.target.value }) }}
            value={this.state.name}
            name="name" />
        </div>
        <div className="form-group col-5">
          <input
            placeholder="Email"
            className="form-control"
            onChange={(e) => { this.setState({ email: e.target.value }) }}
            value={this.state.email}
            name="email" />
        </div>
        <div className="form-group col-2">
          <button
            type="submit"
            className="btn btn-primary float-right"
            disabled={this.submitDisabled}>Add</button>
        </div>
      </div>
    </form>
  }
}

export default AddUser;
