import React, { Component } from "react";

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addBtnStr: "Add",
      btnState: true,
    };
    this.initialState = {
      id: "",
      name: "",
      email: "",
      role: "",
      password: "",
      btnState: true,
      addBtnStr: "Add",
    };
    if (props.user) {
      this.state = props.user;
    } else {
      this.state = this.initialState;
    }
    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  changeBtn = () => {
    this.setState({
      addBtnStr: "Edit",
    });
  };

  render() {
    return (
      <div className="container">
        <h4>Add User</h4>
        <div className="row">
          <form onSubmit={this.handleSubmit}>
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
                value={this.state.addBtnStr}
              >
                {this.state.addBtnStr}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddUser;
