import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button'
import Navbar from '../Navbar/Navbar'
import AddIncome from './AddIncome'; 
import moment from 'moment';


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
      <div className="bg-washed-green">
            <Navbar/>
            <AddIncome getAllIncomes={this.getAllIncomes}/>
            <div className="pa4">
        <div className="overflow-auto">
        <table className='f6 w-100 mw8 center shadow-5' cellSpacing="0">
        <thead>
        <tr>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Value</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Category</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Date</th>
          <th className="fw6 bb b--black-20 tc pb3 pr3 bg-light-gray">Delete</th>
        </tr>
        </thead>
        <tbody className="lh-copy">
          { this.state.listOfIncomes.map( income => {
            return (
              <tr className=" tc bg-light-green shadow-5 grow" key={income._id}>
                  <td>{income.value}€</td>
                  <td>{income.category}</td>
                  <td>{moment(income.date).format("DD MMMM YYYY")}</td>
                  <td><Button name="Delete" color="bg-dark-green" onClick={() => this.deleteHandler(income._id)}>Delete</Button></td>
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
export default IncomeList;




// <div>
//           { this.state.listOfIncomes.map( income => {
//             return (
//               <div key={income._id}>
//                 {/* <Link to={`/incomes/${income._id}`}> */}
//                   <div className= 'tc flex bg-light-green br3 pa3 ma2 dib bw2 shadow-5 grow w-80'>
//                   {income.category} : {income.value}€
//                   <Button name="Delete" color="bg-dark-green" onClick={() => this.deleteHandler(income._id)}>Delete</Button>
//                   </div>
//                 {/* </Link> */}
//               </div>
//             )})
//           }
//         </div>