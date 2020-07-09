import React from 'react';
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div className='tl bg-light-blue br3 pa3 ma2 dib bw2 shadow-5'>
            <ul>
                <li><h1><Link to={"/expenses"}>Expenses</Link></h1></li>
                <li><h1><Link to={"/incomes"}>Incomes</Link></h1></li>
            </ul>
        </div>
    )
}

export default Home