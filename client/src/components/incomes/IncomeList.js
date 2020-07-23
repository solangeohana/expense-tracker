import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button'
import Navbar from '../Navbar/Navbar'
import AddIncome from './AddIncome'; 

class IncomeList extends Component {
  constructor(props){
      super(props);
      this.state = { 
          listOfIncomes: []
        };
  }

  getAllIncomes = () =>{
    axios.get(`/api/incomes`) 
    .then(response => {
      this.setState({
        listOfIncomes: response.data
      })
    })
  }

  deleteHandler = (incomeID) => {
    axios.delete(  `/api/incomes/` + incomeID).then(() => {
      this.setState({
        listOfIncomes: this.state.listOfIncomes.filter(i => i._id !== incomeID)
      })
    })
  }

  componentDidMount() {
    this.getAllIncomes();
  }

  render(){
    return(
      <div>
            <Navbar/>
            <AddIncome getAllIncomes={this.getAllIncomes}/>
        <div>
          { this.state.listOfIncomes.map( income => {
            return (
              <div key={income._id}>
                {/* <Link to={`/incomes/${income._id}`}> */}
                  <div className= 'tc flex bg-light-green br3 pa3 ma2 dib bw2 shadow-5 grow w-80'>
                  {income.category} : {income.value}€
                  <Button name="Delete" color="bg-dark-green" onClick={() => this.deleteHandler(income._id)}>Delete</Button>
                  </div>
                {/* </Link> */}
              </div>
            )})
          }
        </div>
      </div>
    )
  }
}
export default IncomeList;