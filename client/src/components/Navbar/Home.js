
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'


class Home extends Component {
  constructor(props){
      super(props);
      this.state = { 
          listOfExpenses: [],
          listOfIncomes:[],
          isLoading: true
        };
  }

  getAllExpenses = () =>{
    axios.get(`/api/expenses`) 
    .then(response => {
      this.setState({
        listOfExpenses: response.data,
        isLoading: false
      })
    })
  }
  
  getAllIncomes = () =>{
    axios.get(`/api/incomes`) 
    .then(response => {
      this.setState({
        listOfIncomes: response.data,
        isLoading: false
      })
    })
  }

  componentDidMount() {
    this.getAllExpenses();
    this.getAllIncomes();
  }

  render(){
       if(this.state.isLoading){
          return <div>Loading...</div>
      }
      

   const {listOfExpenses, listOfIncomes} = this.state;

    const mappedIncomesByValue = listOfIncomes.map((income) => {
        return income.value
    })
    const mappedExpensesByValue = listOfExpenses.map((expense) => {
        return expense.value
    })
    const resultIncome = mappedIncomesByValue.reduce((a, b) => a + b, 0)
    const resultExpense = mappedExpensesByValue.reduce((a, b) => a + b, 0)
    const totalBalance = resultIncome - resultExpense
    
    return(
        <div>
        <Navbar/>
        <div>
            <ul>
                <li className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l"><Link to={"/expenses"}>Expenses</Link></li>
                <li className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l"><Link to={"/incomes"}>Incomes</Link></li>
            </ul>
        </div>
        <h3 className="f4 f2-m f1-l fw2 black-90 mv3">Total expenses = -{resultExpense}€</h3>
        <h3 className="f4 f2-m f1-l fw2 black-90 mv3">Total incomes = +{resultIncome}€</h3>
        <h2 className="f4 f2-m f1-l fw2 black-90 mv3">Balance = {totalBalance}€</h2>
        </div>
      )
  }
}

export default Home;
