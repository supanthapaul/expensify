import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <div>
        <h1>Expensify</h1>
        <ul>
            <li><NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink></li>
            <li><NavLink to="/create" activeClassName="is-active">Create Expense</NavLink></li>
            <li><NavLink to="/help" activeClassName="is-active">Help</NavLink></li>
        </ul>
    </div>
);

export default Header;