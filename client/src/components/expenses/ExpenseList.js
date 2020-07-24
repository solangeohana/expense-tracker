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
    axios.get(`/api/expenses`) 
    .then(response => {
      console.log("response.data ===>",response.data)
      this.setState({
        listOfExpenses: response.data
      })
    })
  }

  deleteHandler = (expenseID) => {
    axios.delete(`/api/expenses/`+ expenseID).then(() => {
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
      <div className="bg-washed-red">
      <Navbar/>
      <AddExpense getAllExpenses={this.getAllExpenses}/>
        <div className="pa4">
        <div className="overflow-auto">
        <table className='f6 w-100 mw8 center shadow-5' cellSpacing="0">
        <thead>
        <tr>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Description</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Value</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Category</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Date</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Delete</th>
        </tr>
        </thead>
        <tbody className="lh-copy">
          { this.state.listOfExpenses.map( expense => {
            return (
              <tr className=" tc bg-light-pink shadow-5 grow" key={expense._id}>
                  <td>{expense.description}</td>
                  <td>{expense.value}€</td>
                  <td>{expense.category}</td>
                  <td>{moment(expense.date).format("DD MMMM YYYY")}</td>
                  <td><Button name="Delete" color="bg-dark-pink" onClick={() => this.deleteHandler(expense._id)}>Delete</Button></td>
              </tr>
            )})
          }
          </tbody>
          </table>
        </div>
        </div>
      </div>
    )
  }
}

export default ExpenseList;
