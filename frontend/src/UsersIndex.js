import React, { Component } from 'react';
import client from './ApolloClient';
import { GET_USERS } from './Queries';
import User from "./User";
import AddUser from "./AddUser";


class UsersIndex extends Component {
  state = { users: [] }

  async componentDidMount() {
    const { data } = await client.query({
      query: GET_USERS
    });

    this.setState({ users: data.users });
  }

  onUserAdded = (user) => {
    this.setState({ users: [user, ...this.state.users] });
  }

  render() {
    return (
      <React.Fragment>
        <div className="mt-2 mb-4">
          <AddUser onUserAdded={this.onUserAdded} />
        </div>

        {this.state.users && <ul className="list-group">
          {this.state.users.map((user) => {
            return <li key={user.id} className="list-group-item">
              {user.name} &lt;{user.email}&gt; <User user={user} />
            </li>
          })}
        </ul>}
      </React.Fragment>
    )
  }
}

export default UsersIndex;

