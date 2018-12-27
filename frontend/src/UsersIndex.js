import React, { Component } from 'react';
import client from './ApolloClient';
import { GET_USERS, ADD_USER } from './Queries';
import User from "./User";


class UsersIndex extends Component {
  state = { users: [], name: '', email: '' }

  async componentDidMount() {
    const { data } = await client.query({
      query: GET_USERS
    });

    this.setState({ users: data.users });
  }

  async addUser(e) {
    e.preventDefault();

    const { data } = await client.mutate({
      mutation: ADD_USER,
      variables: { name: this.state.name, email: this.state.email }
    });

    const newUsers = [data.createUser.user, ...this.state.users];
    this.setState({ users: newUsers, name: '', email: '' });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="mt-2 mb-4">
          <form className="form-inline" onSubmit={(e) => this.addUser(e)}>
            <input placeholder="Name" className="form-control" onChange={this.handleInputChange} value={this.state.name} name="name" />
            <input placeholder="Email" className="form-control" onChange={this.handleInputChange} value={this.state.email} name="email" />
            <button type="submit" className="btn btn-primary">Add User</button>
          </form>
        </div>

        {this.state.users && <ul className="list-group">
          {this.state.users.map((user) => {
            return <li key={user.id} className="list-group-item">
              {user.name} <User user={user} />
            </li>
          })}
        </ul>}
      </React.Fragment>
    )
  }
}

export default UsersIndex;

