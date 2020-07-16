import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import HomeLink from './HomeLink';
import Button from '../UI/Button'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    handleLogout =() => {
        axios.post("/api/logout")
         .then((resp) => {
          this.setState({ redirect: true })
          this.props.updateUser(resp.data)
        })        
    }
    
    render() {
        return (
            <nav className="flex justify-between br3 pa3 ma2 dib bw2 bg-light-gray">
                {this.state.redirect ? <Redirect to="/login"></Redirect> : null}
                <Link to={"/daily"}>Daily</Link>
                <Link to={"/monthly"}>Monthly</Link>
                <Link to={"/yearly"}>Yearly</Link>
                <Link to={"/charts"}>Charts</Link>
                <Button onClick={this.handleLogout} name="Logout" color="bg-black"></Button>
                <HomeLink/>
            </nav>
        );
    }

}
export default Navbar;

