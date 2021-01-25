
import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfExpenses: [],
      listOfIncomes: [],
      isLoading: true
    };
  }

  getAllExpenses = () => {
    axios.get(`/api/expenses`)
      .then(response => {
        this.setState({
          listOfExpenses: response.data,
          isLoading: false
        })
      })
  }

  getAllIncomes = () => {
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

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    }


    const { listOfExpenses, listOfIncomes } = this.state;

    const mappedIncomesByValue = listOfIncomes.map((income) => {
      return income.value
    })
    const mappedExpensesByValue = listOfExpenses.map((expense) => {
      return expense.value
    })
    const resultIncome = mappedIncomesByValue.reduce((a, b) => a + b, 0)
    const resultExpense = mappedExpensesByValue.reduce((a, b) => a + b, 0)
    const totalBalance = resultIncome - resultExpense

    return (
      <div className="bg-lightest-blue">
        <Navbar />
        <div className="tc f1">
          <a href="/expenses" className="f10 bb link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l"> Expenses</a>
          <a href="/incomes" className="f10 bb link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l"> Incomes</a>
        </div>
        <div className="tc">
          <h3 className="mt4 baskerville fw1 f1 dark-pink">Total expenses = -{resultExpense}€</h3>
          <h3 className="mt2 baskerville fw1 f1 dark-green">Total incomes = +{resultIncome}€</h3>
          <h2 className="mt2 baskerville fw1 f1">Balance = {totalBalance}€</h2>
        </div>
      </div>
    )
  }
}

export default Home;
