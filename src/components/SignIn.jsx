import React, { Component } from 'react'
import { withRouter, Redirect} from 'react-router-dom';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isError: false,
            errorMsg: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSignIn = event => {
        event.preventDefault();
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

    renderError = () => {
        if (this.state.isError)
            return (<p>{this.state.errorMsg}</p>);
    };


    render() {
        if (this.state.redirect)
            return <Redirect to='/' />;
        return (
            <div className="form-container">
                <h3>Sign In</h3>
                <form onSubmit={this.onSignIn}>
                    <label>Username</label>
                    <input
                        required
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        onChange={this.handleChange}
                    />
                    <label>Password</label>
                    <input
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                    <button type="submit">Sign In</button>
                    {this.renderError()}
                </form>
            </div>
        )
    }
}


export default withRouter(SignIn);
