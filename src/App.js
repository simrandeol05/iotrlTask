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

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col s6">
            <AddUser onFormSubmit={this.onFormSubmit} />
            {this.state.error && <div>Error: {this.state.error.message}</div>}
          </div>
          <div className="col s6">
            <h4>Users List</h4>
            <Users />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
