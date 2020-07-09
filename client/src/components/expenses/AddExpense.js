import React, { Component } from 'react';
import axios from 'axios';

class AddExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            value: 0,
            category: ["select", "food", "clothes", "house", "insurances", "health", "travel", "utility bills", "pets", "car", "education", "sports", "cigarettes", "taxi", "public transports", "beauty", "other"]
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

    handleFormSubmit = (event) => {
        event.preventDefault();
        const description = this.state.description;
        const value = this.state.value;
        const category = this.state.category;

        axios.post("/expenses", { description, value, category })
            .then((resp) => {
                console.log("response ====> ", resp)
                this.setState({ description: "", value: "", category: this.state.category[0]});
                this.props.getAllExpenses()
            })
    }

    render() {
        return (
            <div>
                <h3 className = "tl">Add an expense:</h3>
                <div className='tc bg-light-pink br3 pa3 ma2 dib bw2 shadow-5 flex'>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Description:</label>
                        <input type="text" name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
                        <label>Value:</label>
                        <input type="number" name="value" value={this.state.value} onChange={e => this.handleChange(e)} />
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
                    </form>
                </div>
            </div>
        )
    }
}

export default AddExpense;

// optimize options with map