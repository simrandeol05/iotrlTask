import React, { Component } from "react";
import "./App.css";
import Users from "./Users";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddBtn: "Add",
      error: null,
      response: {},
      isEditUser: false,
      _id: "",
      name: "",
      email: "",
      role: "",
      password: "",
      users: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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

  editUser = (user) => {
    this.setState({ ...user, isEditUser: true });
  };

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  deleteUser = async (userId) => {
    let apiEndpoint = "https://rademo.fleetconnect.io/apinode/task-user";
    await axios.delete(apiEndpoint + "/" + userId);
    const users = this.state.users.filter((user) => user._id !== userId);
    this.setState({ users });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    const getUrl = "https://rademo.fleetconnect.io/apinode/task-users";

    const headers = new Headers();
    let apiUrl;

    headers.append("Content-Type", "application/json");

    if (this.state.isEditUser) {
      apiUrl = `https://rademo.fleetconnect.io/apinode/task-user/${this.state._id}`;

      const { name, email, role } = this.state;
      const data = {
        name,
        email,
        role,
      };

      const options = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers,
      };

      fetch(apiUrl, options)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                response: result,
                isEditUser: false,
                name: "",
                role: "",
                email: "",
                password: "",
                _id: "",
              },
              () => {
                axios
                  .get(getUrl)
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
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    } else {
      apiUrl = "https://rademo.fleetconnect.io/apinode/task-user/insert";

      const { name, email, role, password } = this.state;
      const data = {
        name,
        email,
        role,
        password,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers,
      };

      fetch(apiUrl, options)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState(
              {
                response: result,
                name: "",
                role: "",
                email: "",
                password: "",
                _id: "",
              },
              () => {
                axios
                  .get(getUrl)
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
            );
          },
          (error) => {
            this.setState({
              error,
            });
          }
        );
    }
  };

  render() {
    const { isEditUser, users, error } = this.state;

    return (
      <div className="App">
        <div className="row">
          <div className="col s6">
            <div className="container">
              <h4>{isEditUser ? "Edit User" : "Add User"}</h4>
              <div className="row">
                <form onSubmit={this.onFormSubmit}>
                  <div className="row">
                    <input
                      placeholder="Name"
                      id="name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </div>{" "}
                  <div className="row">
                    <input
                      placeholder="Email"
                      id="email"
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="row">
                    <input
                      placeholder="Role"
                      id="role"
                      type="text"
                      name="role"
                      value={this.state.role}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="row">
                    <input
                      placeholder="Password"
                      id="password"
                      type="text"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="row">
                    <input type="hidden" name="id" value={this.state.id} />
                  </div>
                  <div className="row">
                    <button
                      type="submit"
                      className="waves-effect waves-light btn right-align"
                      onClick={this.changeBtn}
                    >
                      {isEditUser ? "Edit" : "Add"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {this.state.error && <div>Error: {this.state.error.message}</div>}
          </div>
          <div className="col s6">
            <h4>Users List</h4>
            <Users
              editUser={this.editUser}
              users={users}
              error={error}
              deleteUser={this.deleteUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
