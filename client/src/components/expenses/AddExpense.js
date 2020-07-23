import React, { Component } from 'react';
import axios from 'axios';
import Button from '../UI/Button'
import Home from '../Navbar/Home';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            value: 0,
            category: ["select", "food", "clothes", "house", "insurances", "health", "travel", "utility bills", "pets", "car", "education", "sports", "cigarettes", "taxi", "public transports", "beauty", "gadgets", "other"],
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
        const description = this.state.description;
        const value = this.state.value;
        const category = this.state.category;
        const date = this.state.date;

        axios.post(`${process.env.REACT_APP_API_URL}/expenses`, {withCredentials: true} , { description, value, category, date })
            .then((resp) => {
                console.log("response ====> ", resp)
                this.setState({ description: "", value: "", category: this.state.category[0], date: Date.now() });
                this.props.getAllExpenses()
            })
    }

    render() {
        return (
            <div>
                <h3 className="tl">Add an expense:</h3>
                <div className='tc bg-light-blue br3 pa3 ma2 dib bw2 shadow-5 flex'>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Description:</label>
                        <input type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
                        <br/>
                        <label>Value:</label>
                        <input type="number" name="value" value={this.state.value} onChange={e => this.handleChange(e)} />
                        <br/>
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
                            <option value="gadgets">Gadgets</option>
                            <option value="other">Other</option>
                        </select>
                        <br/>
                        <label>Date:</label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChangeDate}
                        />
                        <Button name="ADD" color="bg-dark-blue"><input type="submit" value="Submit"/></Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddExpense;

// optimize options with map