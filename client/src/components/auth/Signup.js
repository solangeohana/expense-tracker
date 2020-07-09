import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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

        axios.post("/api/signup", { email, password })
            .then((resp) => {
                this.setState({ email: "", password: "", redirect: true })
                this.props.updateUser(resp.data)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <div>
                {this.state.redirect ? <Redirect to="/" /> : null}
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Email:</label>
                        <input type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />

                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

                        <input type="submit" value="Signup" />
                    </form>
                </div>
                <div>
                    <a href="http://localhost:5555/api/google">Sign up with Google</a>
                    <br/>
                    <p>Already have an account?
                        <Link to={"/login"}> Login</Link>
                    </p>
                </div>
            </div>
        )
    }

}

export default Signup;