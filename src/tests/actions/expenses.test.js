import configureMockStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([reduxThunk]);

// store dummy expenses on test firebase database
beforeEach(done => {
   const expenseData = {};
   expenses.forEach(({ id, description, amount, note, createdAt }) => {
      expenseData[id] = { description, amount, note, createdAt };
   });

   database.ref('expenses').set(expenseData).then(() => done())
});

test('Should setup remove expense action object', () => {

   const action = removeExpense({ id: '123abc' });

   // for objects/array use toEqual instead of toBe
   expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc'
   });
});

test('Should setup edit expense action object', () => {

   const action = editExpense('123abc', { note: 'New updated note' });

   // for objects/array use toEqual instead of toBe
   expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc',
      updates: {
         note: 'New updated note'
      }
   });
});

// adExpense test with given values
test('Should setup add expense action object with provided values', () => {
   const action = addExpense(expenses[2]);

   // for objects/array use toEqual instead of toBe
   expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[2]
   });
});

// async test
test('Should add expense to database and store', (done) => {
   const store = createMockStore({});
   const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000
   }

   store.dispatch(startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
         type: 'ADD_EXPENSE',
         expense: {
            id: expect.any(String),
            ...expenseData
         }
      });

      // check if the data reached firebase (return the promise)
      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
   }) // resolve the promise here
      .then((snapshot) => {
         expect(snapshot.val()).toEqual(expenseData);
         // tell jest that the test is done
         done();
      })
});

test('Should add expense with defaults to database and store', (done) => {
   const store = createMockStore({});
   const defaultExpenseData = {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
   }

   store.dispatch(startAddExpense(defaultExpenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
         type: 'ADD_EXPENSE',
         expense: {
            id: expect.any(String),
            ...defaultExpenseData
         }
      });

      // check if the data reached firebase (return the promise)
      return database.ref(`expenses/${actions[0].expense.id}`).once('value')
   }) // resolve the promise here
      .then((snapshot) => {
         expect(snapshot.val()).toEqual(defaultExpenseData);
         // tell jest that the test is done
         done();
      })
});

test('Should setup Set Expense action object with values', () => {
   const action = setExpenses(expenses);
   expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
   })
});

test('Should set expenses from database and store', (done) => {
   const store = createMockStore({});

   store.dispatch(startSetExpenses()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
         type: 'SET_EXPENSES',
         expenses
      });

      done();
   });
});