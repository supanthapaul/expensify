import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
   const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
   const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
   return (
      <h1>Viewing {expensesCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
   )
}

const mapStateToProps = (state) => {
   const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
   return {
      expensesCount: visibleExpenses.length,
      expensesTotal: getExpensesTotal(visibleExpenses)
   }
}

export default connect(mapStateToProps)(ExpensesSummary);