import getExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expense', () => {
   const total = getExpensesTotal([]);

   expect(total).toBe(0);
});

test('Should correctly add a single expense', () => {
   const total = getExpensesTotal(expenses.slice(0, 1));

   expect(total).toBe(195);
});

test('Should correctly add a single expense', () => {
   const total = getExpensesTotal(expenses);

   expect(total).toBe(114195);
});