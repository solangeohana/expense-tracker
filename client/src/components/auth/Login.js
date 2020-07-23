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

        axios.post(`/api/login`, { email, password })
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
        const imgUrl = "https://support.clever.com/hc/article_attachments/360054105332/google.png"
        return (
            <div className="pa4 bg-lightest-blue black-80">
            <h1 className="tc mt2 mb0 baskerville i fw1 f1">Expense-Tracker</h1>
            <h2 className=" tc mt2 mb0 f6 fw4 ttu tracked">Never wonder why you're broke again</h2>
            <br/>
            <br/>
                <div>
                    {this.state.errorMessage ? <h1>{this.state.errorMessage}</h1> : null}
                    {this.state.redirect ? <Redirect to="/" /> : null}
                    <form className="measure center" onSubmit={this.handleFormSubmit}>
                    <fieldset className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Login</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Email:</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-light-blue hover-dark-blue w-100" type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-light-blue hover-dark-blue w-100" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                    </div>
                    </fieldset>
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login" />
                    </form>
                </div>
                <br/>
                <div className="measure center">
                    <a href="http://localhost:5555/api/google" className="f4 fw6 db black link hover-blue">
                        <img src={imgUrl} alt="logo google" height="50px"></img>
                    </a>
                    <br />
                    <p>Don't have an account?
                    <a href="/signup" className="f5 fw6 db black link hover-blue">Signup</a>
                    </p>
                </div>
            </div>
        )
    }
}
export default Login;

