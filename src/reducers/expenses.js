// Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {

   switch (action.type) {
      case 'ADD_EXPENSE':
         return [
            ...state,           // keep the already existing expenses
            action.expense      // add the new one
         ]
      case 'REMOVE_EXPENSE':
         return state.filter(expense => expense.id !== action.id);//return with specified object removed
      case 'EDIT_EXPENSE':
         return state.map(expense => {
            if (expense.id === action.id) {
               return {
                  ...expense,         // have the existing properties
                  ...action.updates   // override the properties passed into updates
               }
            } else {
               return expense;
            }
         })
      case 'SET_EXPENSES':
         return action.expenses;
      default:
         return state;
   }
};

export default expensesReducer;