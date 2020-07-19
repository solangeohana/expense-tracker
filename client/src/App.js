import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'

import AddIncome from './components/incomes/AddIncome';
import ExpenseList from './components/expenses/ExpenseList';
import Home from './components/Navbar/Home'
import IncomeList from './components/incomes/IncomeList';
import EditExpense from './components/expenses/EditExpense'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import BalanceToday from './components/Today/BalanceToday';

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: this.user
    }
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
       {this.state.loggedInUser ? <h1> Welcome {this.state.loggedInUser.email} !</h1> : ""}
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path="/signup" render={() => <Signup updateUser={this.updateUser}></Signup>} />
          <Route exact path="/login" render={() => <Login updateUser={this.updateUser}></Login>} />
          <Route exact path='/expenses' component={ExpenseList}/>
          <Route exact path='/daily' component={BalanceToday}/>
          <Route exact path='/incomes' component={IncomeList}/>
          <Route exact path='/incomes/new' component={AddIncome}/>
          <Route exact path='/expenses/edit/:id' component={EditExpense}/>
        </Switch>
      </div>
      </div>
    );
  }
}

export default App;
