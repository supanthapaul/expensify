import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>${amount} - {createdAt} </p>
    </div>
);

// here we don't need any values from the store
// we just connect the component to the store
// so that we get access to dispatch
export default ExpenseListItem;