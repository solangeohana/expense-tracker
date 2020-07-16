import React from 'react';
import DailyExpenses from '../expenses/DailyExpenses'
import DailyIncome from '../incomes/DailyIncomes'

const Today = () => {

    return(
      <div>
        <h3>Today's balance :</h3>
          <DailyExpenses/>
          <DailyIncome/>
      </div>
    )

}

export default Today;