import authReducer from '../../reducers/auth';

test('Should setup uid on login', () => {
   const action = {
      type: 'LOGIN',
      uid: '1234'
   };
   const state = authReducer({}, action);
   expect(state.uid).toBe(action.uid);
});


test('Should not setup uid on logout', () => {
   const action = {
      type: 'LOGOUT'
   };
   const state = authReducer({ uid: 'anything' }, action);
   expect(state).toEqual({});
})