import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import AddExpense from './AddExpense'; 
import EditExpense from './EditExpense';
import Button from '../UI/Button'
import moment from 'moment';


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
      console.log("response.data ===>",response.data)
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
      <AddExpense getAllExpenses={this.getAllExpenses}/>
        <div className=".fl w-50 pa2">
        <h3 className="flex flex-column-l ma2 pa3">List of expenses :</h3>
          { this.state.listOfExpenses.map( expense => {
            return (
              <div className="flex flex-column-l" key={expense._id}>

                  <div className= 'tc bg-light-blue br3 pa3 ma2 dib bw2 shadow-5 grow'>
                  <p>{moment(expense.date).format("DD MMMM YYYY")}</p>
                  <p>{expense.description} : {expense.value}€</p>
                  <Button name="Delete" color="bg-dark-blue" onClick={() => this.deleteHandler(expense._id)}>Delete</Button>
                  </div>
                
              </div>
            )})
          }
        </div>
      </div>
    )
  }
}

export default ExpenseList;

/*

<Link to={`/expenses/edit/${expense._id}`} > 

*/ 