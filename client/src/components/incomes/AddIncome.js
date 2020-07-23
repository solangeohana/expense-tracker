import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class AddIncome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            category: ["salary", "gift", "interest", "other"],
            date: new Date()
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleChangeCategory = (event) => {
        const options = event.target.options;
        let category = "";
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                category = options[i].value
            }
        }
        this.setState({ category: category });
    }

    handleChangeDate = date => {
        this.setState({
            date: date
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const value = this.state.value;
        const category = this.state.category;
        const date = this.state.date;


        axios.post(`${process.env.REACT_APP_API_URL}/incomes`, {withCredentials: true}  , { value, category, date })
            .then((resp) => {
                console.log("response ====> ", resp)
                this.setState({ value: "", category: this.state.category[0], date: Date.now()});
                this.props.getAllIncomes()
            })
    }

    render() {
        return (
            <div>
                <h3 className = "flex flex-column">Add an income</h3>
                <div className='tc bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
                    <form className="pa4 black-80" onSubmit={this.handleFormSubmit}>
                        <div className="measure">
                        <label className=" tl f6 b db mb2">Value:</label>
                        <input className="input-reset ba b--black-20 pa2 mb2 db w-50" type="number" name="value" value={this.state.value} onChange={e => this.handleChange(e)} />
                        <br/>
                        <label className=" tl f6 b db mb2">Category:</label>
                        <select className= "fl" value={this.state.category} onChange={e => this.handleChangeCategory(e)}>
                            <option value="select">Select</option>
                            <option value="salary">Salary</option>
                            <option value="gift">Gift</option>
                            <option value="interest">Interest</option>
                            <option value="other">Other</option>
                        </select>
                        <br/>
                        <label className=".tl f6 b db mb2">Date:</label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChangeDate}
                        />
                        <Button name="ADD" color="bg-dark-green"><input type="submit" value="Submit" /></Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddIncome;

// to add : if the user uses , instead of . suggest that he uses a point
// optimize options with map

