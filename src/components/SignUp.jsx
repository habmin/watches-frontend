import React, { Component } from "react";
import { withRouter, Redirect} from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordConfirmation: "",
      isError: false,
      errorMsg: "",
    };
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
      // isError: false,
      // errorMsg: "",
    });

  onSignUp = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.passwordConfirmation){
      this.setState({
        errorMsg: "Password and confirmation do not match",
        isError: true
      });
    }
    else {
      fetch(this.props.baseURL + '/users/register', {
        method: 'POST',
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
        }),
        headers: {'Content-Type': 'application/json'}
      }).then((res) => {
          return res.json();
      }).then((user) => {
          this.props.loginUser(user);
          this.setState({
              username: "",
              password: "",
          });
      }).catch((err) => {console.error({'Error': err})});
    }
  };

  renderError = () => {
    if (this.state.isError)
      return (<p>{this.state.errorMsg}</p>);
  };

  render() {
    return (
      <div className="form-container">
        <h3>Sign Up</h3>
        <form onSubmit={this.onSignUp}>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Enter username"
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            required
            name="password"
            value={this.state.password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <label>Password Confirmation</label>
          <input
            required
            name="passwordConfirmation"
            value={this.state.passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
        {this.renderError()}
      </div>
    );
  };
};

export default withRouter(SignUp);
