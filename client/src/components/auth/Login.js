import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            redirect: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        const email = this.state.email;
        const password = this.state.password;

        axios.post("/api/login", { email, password })
            .then((resp) => {
                this.setState({ email: '', password: '', redirect: true });
                this.props.updateUser(resp.data)
            })
            .catch((error) => {
                console.log("ERROR !!")
                console.log(error.response)
                this.setState({
                    errorMessage: error.response.data.message
                })
            })
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null}
                    {this.state.redirect ? <Redirect to="/" /> : null}
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Email:</label>
                        <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <div>
                    <a href="http://localhost:5555/api/google">Login with Google</a>
                    <br />
                    <p>Don't have an account?
                    <Link to={"/signup"}>Signup</Link>
                    </p>
                </div>
            </div>
        )
    }

}

export default Login;