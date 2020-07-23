import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Navbar from '../Navbar/Navbar'

class BalanceToday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfDailyExpenses: [],
      listOfDailyIncomes: [],
      today: Date.now(),
      isLoading: true
    };
  }
  getAllDailyExpenses = () => {
    axios.get(`/api/expenses`)
      .then(response => {
        this.setState({
          listOfDailyExpenses: response.data,
          isLoading: false
        })
      })
  }

  getAllDailyIncomes = () => {
    axios.get(`/api/incomes`)
      .then(response => {
        this.setState({
          listOfDailyIncomes: response.data,
          isLoading: false
        })
      })
  }

  componentDidMount() {
    this.getAllDailyExpenses();
    this.getAllDailyIncomes();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    }

    const filteredIncomes = this.state.listOfDailyIncomes.filter(d => {
      return moment(d.date).format("DD MMMM YYYY") === moment(this.state.today).format("DD MMMM YYYY")
    })
    const filteredExpenses = this.state.listOfDailyExpenses.filter(d => {
      return moment(d.date).format("DD MMMM YYYY") === moment(this.state.today).format("DD MMMM YYYY")
    })
    const mappedIncomesByValue = filteredIncomes.map((income) => {
      return income.value
    })
    const mappedExpensesByValue = filteredExpenses.map((expense) => {
      return expense.value
    })
    const resultIncome = mappedIncomesByValue.reduce((a, b) => a + b, 0)
    const resultExpense = mappedExpensesByValue.reduce((a, b) => a + b, 0)
    const totalBalance = resultIncome - resultExpense

    return (
      <div className="bg-lightest-blue">
        <Navbar />
        <div className="pa4">
          <div className="overflow-auto">
            <h6 className="tc f2-m f1-l black-90 mv3 baskerville fw1 f1 dark-pink">Expenses :</h6>
            <table className='f6 w-100 mw8 center shadow-5' cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Description</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Value</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Category</th>
                  <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Date</th>
                </tr>
              </thead>

              <tbody className="lh-copy">
                {filteredExpenses.map(expense => {
                  return (
                    <tr className="tc bg-light-pink shadow-5 grow" key={expense._id}>
                      <td>{expense.description}</td>
                      <td>{expense.value}€</td>
                      <td>{expense.category}</td>
                      <td>{moment(expense.date).format("DD MMMM YYYY")}</td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
            <h3 className="tc f2-m f1-l black-90 mv3 baskerville fw1 f1  dark-pink">Total : -{resultExpense}€</h3>
          </div>

        </div>
        <div className="pa4">
          <div className="overflow-auto">
            <h4 className="tc f2-m f1-l black-90 mv3 baskerville fw1 f1 dark-green">Incomes :</h4>
            <table className='f6 w-100 mw8 center shadow-5' cellSpacing="0">
        <thead>
        <tr>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Value</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Category</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Date</th>
        </tr>
        </thead>
        <tbody className="lh-copy">
          { filteredIncomes.map( income => {
            return (
              <tr className=" tc bg-light-green shadow-5 grow" key={income._id}>
                  <td>{income.value}€</td>
                  <td>{income.category}</td>
                  <td>{moment(income.date).format("DD MMMM YYYY")}</td>
              </tr>
            )})
          }
          </tbody>
          </table>
          </div>
          <h3 className="tc f2-m f1-l black-90 mv3 baskerville fw1 f1  dark-green">Total : +{resultIncome}€</h3>
        </div>
        <h3 className="tc f2-m f1-l black-90 mv3 baskerville fw1 f1 ">Balance today = {totalBalance}€</h3>
      </div>
    )
  }
}

export default BalanceToday;

