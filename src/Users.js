import React, { Component } from "react";

class Users extends Component {
  render() {
    const { users, error, deleteUser, editUser } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <table className="striped tableClass">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="stripped">
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="waves-effect waves-light btn right-align"
                      onClick={() => editUser(user)}
                    >
                      <i className="material-icons">create</i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="waves-effect waves-light btn right-align"
                      onClick={() => deleteUser(user._id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Users;
