import React, { Component } from "react";
import "./App.css";
import Users from "./Users";
import AddUser from "./AddUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddUser: true,
      AddBtn: "Add",
      error: false,
      response: {},
      user: {},
      isEditUser: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(data) {
    const apiUrl = "https://rademo.fleetconnect.io/apinode/task-user/insert";

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    };

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  editUser = (userId) => {
    const apiUrl = "https://rademo.fleetconnect.io/apinode/task-user";

    const formData = new FormData();
    formData.append("userId", userId);

    const options = {
      method: "POST",
      body: formData,
    };

    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            user: result,
            isEditUser: true,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  };

  render() {
    let userForm;

    if (this.state.isEditUser) {
      userForm = (
        <AddUser onFormSubmit={this.onFormSubmit} user={this.state.user} />
      );
    }

    return (
      <div className="App">
        <div className="row">
          <div className="col s6">
            <AddUser onFormSubmit={this.onFormSubmit} />
            {this.state.error && <div>Error: {this.state.error.message}</div>}
            {userForm}
          </div>
          <div className="col s6">
            <h4>Users List</h4>
            <Users editUser={this.editUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
