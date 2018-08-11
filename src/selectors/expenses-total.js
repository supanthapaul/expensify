const getExpensesTotal = (expenses) => {
   const total = expenses
      .map(expense => expense.amount)
      .reduce((total, amount) => total + amount, 0);

   return total;
}

export default getExpensesTotal;