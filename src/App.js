import React, { Component } from "react";
import "./App.css";
import Users from "./Users";
import AddUser from "./AddUser";
import axios from "axios";

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
    let apiUrl;
    if (this.state.isEditUser) {
      apiUrl = "https://rademo.fleetconnect.io/apinode/task-user";
    } else {
      apiUrl = "https://rademo.fleetconnect.io/apinode/task-user/insert";
    }

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

  editUser = (id) => {
    //const apiUrl = "https://rademo.fleetconnect.io/apinode/task-user/";

    const options = {
      method: "post",
      url:
        "https://rademo.fleetconnect.io/apinode/task-user/5e86dbc436fa5931de124c62",
      data: {
        firstName: "Vijay Kumar",
        password: "123123",
      },
      transformRequest: [
        (data, headers) => {
          // transform the data

          return data;
        },
      ],
    };

    // send the request
    axios(options);
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
