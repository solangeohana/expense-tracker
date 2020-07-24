// import React, { Component } from 'react';
// import { Doughnut, Bar, Pie } from 'react-chartjs-2';
// import axios from 'axios';

// class ExpensesCharts extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             chartData:{
//                 labels: [],
//                 datasets: [
//                     {
//                         label: 'Expenses',
//                         data: [],
//                         backgroundColor : 'rgba(255,99,132,0.6)'
//                     }
//                 ]
//             }
//         };
//     }
//     getAllExpenses = () => {
//         axios.get(`/api/expenses`) 
//         .then(response => {
//           console.log("response.data ===>",response.data)
//           for (let i=0 ; i < (response.data).length ; i ++) {
//             this.setState({
//                 chartData:{
//                     labels: [],
//                     datasets: [
//                         {
//                             label: 'Expenses',
//                             data: [],
//                             backgroundColor : 'rgba(255,99,132,0.6)'
//                         }
//                     ]
//                 }
//             })
//           }
          
//         })
//       }
    
//     getAllValues = () => { 


//     }
//     componentDidMount() {
//       this.getAllExpenses();
//       this.getAllValues();
//     }


//     render(){

//             return (
//                 <div className="chart">
//                     <Bar
//                     data={this.state.chartData}
                    
//                     />
//                 </div>
//             )
//     }
// }

// export default ExpensesCharts;