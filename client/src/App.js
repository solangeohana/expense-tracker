import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import AddIncome from './components/incomes/AddIncome';
import ExpenseList from './components/expenses/ExpenseList';
import Home from './components/Navbar/Home'
import IncomeList from './components/incomes/IncomeList';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import BalanceToday from './components/Today/BalanceToday';
class App extends Component {

  state = {
    loggedInUser: this.props.user
  } 

  updateUser = (newUser) => {
    this.setState({
      loggedInUser: newUser
    })
  }
  

  render() {
    return (
      <div className="">
      <div>
        <Switch>
          <Route exact path='/' render={() => {

            return this.state.loggedInUser ? <Home/> : <Redirect to="/login"></Redirect>
          }}></Route>
          <Route exact path="/signup" render={() => <Signup updateUser={this.updateUser}></Signup>} />
          <Route exact path="/login" render={() => <Login updateUser={this.updateUser}></Login>} />
          <Route exact path='/expenses' component={ExpenseList}/>
          <Route exact path='/daily' component={BalanceToday}/>
          <Route exact path='/incomes' component={IncomeList}/>
        </Switch>
      </div>
      </div>
    );
  }
}

export default App;
