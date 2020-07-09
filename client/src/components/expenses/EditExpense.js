
import React, { Component } from 'react';
import axios from 'axios';

class EditExpense extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //       description: this.props.theExpense.description, 
  //       value: this.props.theExpense.value, 
  //       category: this.props.theExpense.value
  //   }
  // }

  // handleFormSubmit = (event) => {
  //   const description = this.state.description;
  //   const value = this.state.value;
  //   const category = this.state.category;

  //   event.preventDefault();

  //   axios.put(`/expenses/${this.props.theExpense._id}`, { description, value, category })
  //   .then( () => {
  //       this.props.getTheExpense();
  //       // after submitting the form, redirect to '/projects'
  //       this.props.history.push('/expenses');    
  //   })
  //   .catch( error => console.log(error) )
  // }

  // handleChangeDesc = (event) => {  
  //   this.setState({
  //     description: event.target.value
  //   })
  // }

  // handleChangeValue = (event) => {  
  //   this.setState({
  //     value : event.target.value
  //   })
  // }

  // handleChangeCategory = (event) => {  
  //   this.setState({
  //     category: event.target.value
  //   })
  // }

  render(){
    console.log(this.props.match.params.id)
    return (
      <div>
      hello
        {/* <hr />
        <h3>Edit expense</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Description:</label>
          <input type="text" name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)}/>
          <label>Value:</label>
          <imput type="number" name="value" value={this.state.value} onChange={e => this.handleChangeValue(e)} />
          <label>Category:</label>
                        <select value={this.state.category} onChange={e => this.handleChangeCategory(e)}>
                            <option value="select">Select</option>
                            <option value="food">Food</option>
                            <option value="clothes">Clothes</option>
                            <option value="house">House</option>
                            <option value="insurances">Insurances</option>
                            <option value="health">Health</option>
                            <option value="travel">Travel</option>
                            <option value="utility bills">Utility bills</option>
                            <option value="pets">Pets</option>
                            <option value="car">Car</option>
                            <option value="education">Education</option>
                            <option value="sport">Sports</option>
                            <option value="cigarettes">Cigarettes</option>
                            <option value="taxi">Taxi</option>
                            <option value="public transports">Public Transports</option>
                            <option value="beauty">Beauty</option>
                            <option value="other">Other</option>
                        </select>
          <input type="submit" value="Submit" />
        </form> */}
      </div>
    )
  }
}

export default EditExpense;