import React, { Component } from "react";

class SignUp extends Component {
  constructor() {
    super();

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
      [event.target.name]: event.target.value,
      isError: false,
      errorMsg: "",
    });

  onSignUp = (event) => {
    event.preventDefault();

    const { history, setUser } = this.props;

    signUp(this.state)
      .then(() => signIn(this.state))
      .then((res) => setUser(res.user))
      .then(() => history.push("/"))
      .catch((error) => {
        console.error(error);
        this.setState({
          username: "",
          password: "",
          passwordConfirmation: "",
          isError: true,
          errorMsg: "Sign Up Details Invalid",
        });
      });
  };

  renderError = () => {
    const toggleForm = this.state.isError ? "danger" : "";
    if (this.state.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {this.state.errorMsg}
        </button>
      );
    } else {
      return <button type="submit">Sign Up</button>;
    }
  };

  render() {
    const { username, password, passwordConfirmation } = this.state;

    return (
      <div className="form-container">
        <h3>Sign Up</h3>
        <form onSubmit={this.onSignUp}>
          <label>Username</label>
          <input
            required
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <label>Password Confirmation</label>
          <input
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          {this.renderError()}
        </form>
      </div>
    );
  }
}

export default SignUp;