import React, { Component } from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { addExpense } from '../actions/expenses'

export class AddExpensePage extends Component {

   onSubmit = (expense) => {
      // handle submit
      this.props.addExpense(expense);
      // redirect to dashboard
      this.props.history.push('/');
   }

   render() {
      return (
         <div>
            <p>Add Expense</p>
            <ExpenseForm
               onSubmit={this.onSubmit}
            />
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) => ({
   addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(null, mapDispatchToProps)(AddExpensePage);