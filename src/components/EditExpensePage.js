import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses'


export class EditExpensePage extends Component {

   onSubmit = (expense) => {
      // dispatch the action to edit the expense
      this.props.startEditExpense(this.props.expense.id, expense);
      // redirect to dashboard
      this.props.history.push('/');
   }
   onRemoveClick = () => {
      // dispatch the action to remove the expense
      this.props.startRemoveExpense({ id: this.props.expense.id });
      // redirect to dashboard
      this.props.history.push('/');
   }

   render() {
      return (
         <div>
            <ExpenseForm
               expense={this.props.expense}
               onSubmit={this.onSubmit}
            />
            <button onClick={this.onRemoveClick}
            >Remove</button>
         </div>
      )
   }
}

const mapStateToProps = (state, props) => {
   return {
      expense: state.expenses.find((expense) => expense.id === props.match.params.id)
   }
}

const mapDispatchToProps = (dispatch) => ({
   startEditExpense: (expenseId, updates) => dispatch(startEditExpense(expenseId, updates)),
   startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);