import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Button from '../UI/Button'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    handleLogout =() => {
        axios.post(`/api/logout`)
         .then((resp) => {
          this.setState({ redirect: true })
          this.props.updateUser(resp.data)
        })        
    }
    
    render() {
        return (
        <div>
            <header className="bg-lightest-blue black-80 tc pv4 avenir">
            <h1 className="mt2 mb0 baskerville i fw1 f1">Expense-Tracker</h1>
            <h2 className="mt2 mb0 f6 fw4 ttu tracked">Never wonder why you're broke again</h2>
            <nav className="bt bb tc mw7 center mt4">
                {this.state.redirect ? <Redirect to="/login"></Redirect> : null}
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-blue dib pa3 ph4-l" href="/">Home</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l" href="/daily">Today</a>
                <a className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l" href="/charts">Charts</a>
                <Button onClick={this.handleLogout} name="Logout" color="bg-gray"></Button>
            </nav>
            </header>
        </div>
        );
    }

}
export default Navbar;


