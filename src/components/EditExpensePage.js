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
            <div className="page-header">
               <div className="content-container">
                  <h1 className="page-header__title">Edit Expense</h1>
               </div>
            </div>
            <div className="content-container">
               <ExpenseForm
                  expense={this.props.expense}
                  onSubmit={this.onSubmit}
               />
               <button className="button button--secondary" onClick={this.onRemoveClick}
               >Remove Expense</button>
            </div>
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