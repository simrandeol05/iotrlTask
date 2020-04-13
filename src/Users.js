import React, { Component } from "react";
import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
    };
  }

  componentDidMount() {
    const apiUrl = "https://rademo.fleetconnect.io/apinode/task-users";

    axios
      .get(apiUrl)
      .then((response) => response.data)
      .then(
        (result) => {
          this.setState({
            users: result,
          });
        },
        (error) => {
          this.setState({ error });
        }
      );
  }

  deleteUser = async (userId) => {
    let apiEndpoint = "https://rademo.fleetconnect.io/apinode/task-user";
    await axios.delete(apiEndpoint + "/" + userId);
    const users = this.state.users.filter((user) => user._id !== userId);
    this.setState({ users });
  };

  render() {
    const { error, users } = this.state;

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
                      onClick={() => this.props.editUser(user._id)}
                    >
                      <i className="material-icons">create</i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="waves-effect waves-light btn right-align"
                      onClick={() => this.deleteUser(user._id)}
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
