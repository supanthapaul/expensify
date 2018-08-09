import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

// export unconnected component for testing
export const ExpenseList = (props) => (
   <div>
      {
         props.expenses.length === 0 ? (
            <p>No Expenses.</p>
         ) : (
               props.expenses.map((expense) => {
                  return <ExpenseListItem key={expense.id} {...expense} />
               })
            )
      }

   </div>
);

const mapStateToProps = (state) => {
   // return object with the things you wanna grab from the store
   // it gets passed into the component as props
   return {
      expenses: selectExpenses(state.expenses, state.filters)
   }
};

// create and export the higher order component
export default connect(mapStateToProps)(ExpenseList);
