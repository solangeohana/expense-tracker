import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Navbar from '../Navbar/Navbar'

class BalanceToday extends Component {
  constructor(props){
      super(props);
      this.state = { 
          listOfDailyExpenses: [],
          listOfDailyIncomes:[],
          today: Date.now(),
          isLoading: true
        };
  }

  getAllDailyExpenses = () =>{
    axios.get("/expenses") 
    .then(response => {
      this.setState({
        listOfDailyExpenses: response.data,
        isLoading: false
      })
    })
  }
  
  getAllDailyIncomes = () =>{
    axios.get("/incomes") 
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

  render(){
       if(this.state.isLoading){
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
    
    return(
        <div>
        <Navbar/>
        <div>
        <div className=".fl w-50 pa2">
        <h4 className="flex flex-column-l ma2 pa3">Expenses :</h4>
          { filteredExpenses.map( expense => {
            return (
              <div className="flex flex-column-l" key={expense._id}>
                  <div className= 'tc bg-light-blue br3 pa3 ma2 dib bw2 shadow-5 grow'>
                  {expense.description} : {expense.value}€
                  </div>
              </div>
            )})
          }
        </div>
        <h3>Total : -{resultExpense}€</h3>

      </div>
        <div>
          <div>
          <h4 className="flex flex-column-l ma2 pa3">Incomes :</h4>
            { filteredIncomes.map( income => {
              return (
                <div className="flex flex-column-l" key={income._id}>
                    <div className= 'tc bg-light-blue br3 pa3 ma2 dib bw2 shadow-5 grow'>
                    {income.category} : {income.value}€
                    </div>
                </div>
              )})
            }
          </div>
          <h3>Total : +{resultIncome}€</h3>
        </div>
        <h1>Balance today = {totalBalance}€</h1>
        </div>
      )
  }
}

export default BalanceToday;
