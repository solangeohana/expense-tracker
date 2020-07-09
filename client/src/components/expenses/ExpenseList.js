import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddExpense from './AddExpense'; 
import Header from '../Navbar/Header'
import EditExpense from './EditExpense';


class ExpenseList extends Component {
  constructor(props){
      super(props);
      this.state = { 
          listOfExpenses: []
        };
  }

  getAllExpenses = () =>{
    axios.get("/expenses") 
    .then(response => {
      this.setState({
        listOfExpenses: response.data
      })
    })
  }

  deleteHandler = (expenseID) => {
    axios.delete('/expenses/' + expenseID).then(() => {
      this.setState({
        listOfExpenses: this.state.listOfExpenses.filter(e => e._id !== expenseID)
      })
    })
  }

  componentDidMount() {
    this.getAllExpenses();
  }

  render(){
    return(
      <div>
      <Header/>
      <AddExpense getAllExpenses={this.getAllExpenses}/>
        <div>
        <h3>List of expenses :</h3>
          { this.state.listOfExpenses.map( expense => {
            return (
              <div key={expense._id}>
                <Link to={`/expenses/edit/${expense._id}`} >
                  <div className= 'tl bg-light-pink br3 pa3 ma2 dib bw2 shadow-5 grow'>
                  {expense.description} : {expense.value}€
                  <button onClick={() => this.deleteHandler(expense._id)}>Delete</button>
                  </div>
                </Link>
              </div>
            )})
          }
        </div>
      </div>
    )
  }
}

export default ExpenseList;