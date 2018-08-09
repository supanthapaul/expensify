import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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

    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'a note'
    }

    const action = addExpense(expenseData);

    // for objects/array use toEqual instead of toBe
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            // the id is random so we just check the type
            // and not care about its value
            id: expect.any(String)
        }
    });
});

// adExpense test with default values
test('Should setup add expense action object with default values', () => {

    const action = addExpense();

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});