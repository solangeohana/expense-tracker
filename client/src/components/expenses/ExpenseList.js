import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import AddExpense from './AddExpense'; 
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
    axios.get(`${process.env.REACT_APP_API_URL}/expenses`, {withCredentials: true}) 
    .then(response => {
      console.log("response.data ===>",response.data)
      this.setState({
        listOfExpenses: response.data
      })
    })
  }

  deleteHandler = (expenseID) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/expenses/`, {withCredentials: true} + expenseID).then(() => {
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
      <Navbar/>
      <AddExpense getAllExpenses={this.getAllExpenses}/>
        <div>
        <h3 className="ma2 pa3">List of expenses :</h3>
          { this.state.listOfExpenses.map( expense => {
            return (
              <div className="" key={expense._id}>
                  <div className= '.flex-row tc inline bg-light-blue br3 pa3 ma2 dib bw2 shadow-5 grow w-80'>
                  <strong>{moment(expense.date).format("DD MMMM YYYY")}</strong>
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