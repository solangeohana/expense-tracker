import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Navbar/Header'


class AddIncome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            category: ["salary", "gift", "interest", "other"]
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
        const value = this.state.value;
        const category = this.state.category;

        axios.post("/incomes", { value, category })
            .then((resp) => {
                console.log("response ====> ", resp)
                this.setState({ value: "", category: this.state.category[0]});
                this.props.getAllIncomes()
            })
    }

    render() {
        return (
            <div>
            <Header/>
                <h3 className = "tl">Add an income</h3>
                <div className='tc bg-light-green br3 pa3 ma2 dib bw2 shadow-5 flex'>
                    <form onSubmit={this.handleFormSubmit}>
                        <label>Value:</label>
                        <input type="number" name="value" value={this.state.value} onChange={e => this.handleChange(e)} />
                        <label>Category:</label>
                        <select value={this.state.category} onChange={e => this.handleChangeCategory(e)}>
                            <option value="select">Select</option>
                            <option value="salary">Salary</option>
                            <option value="gift">Gift</option>
                            <option value="interest">Interest</option>
                            <option value="other">Other</option>
                        </select>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default AddIncome;

// to add : if the user uses , instead of . suggest that he uses a point
// optimize options with map