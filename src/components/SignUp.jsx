import React, { Component } from "react";
import { withRouter, Redirect} from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: "",
      phone: "",
      passwordConfirmation: "",
      isError: false,
      errorMsg: "",
      redirect: false
    };
  }

  handleChange = (event) =>
    this.setState({
      [event.target.name]: event.target.value
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
            email: this.state.email,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email
        }),
        headers: {'Content-Type': 'application/json'}
      }).then((res) => {
          return res.json();
      }).then((user) => {
        console.log(user);
        if (user.error) {
          this.setState({
            errorMsg: `${user.error}`,
            isError: true
          });
        }
        else {
          //logins user automatically
          fetch(this.props.baseURL + '/sessions', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: {'Content-Type': 'application/json'}
          }).then((res) => {
            return res.json();
          }).then((user) => {
            console.log(user);
            if (user.error) {
            this.setState({
              errorMsg: `${user.error}`,
              isError: true
            });
          }
          else {
            this.props.loginUser(user);
            this.setState({
              redirect: true
            });
          }
          }).catch((err) => {console.error({'Error': err})});
        }
      }).catch((err) => {console.error({'Error': err})});
    }
  };

  renderError = () => {
    if (this.state.isError)
      return (<p>{this.state.errorMsg}</p>);
  };

  render() {
    if (this.state.redirect)
      return <Redirect to='/' />;
    return (
      <div className="form-container">
        <h3>Sign Up</h3>
        <form onSubmit={this.onSignUp}>
          <label htmlFor="username">Username:</label>
          <input
            required
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={this.handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            required
            type="text"
            name="email"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
          <label htmlFor="Name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={this.handleChange}
          />
          <label htmlFor="Name">Phone Number:</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            value={this.state.password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
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
