import React from 'react'
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => {
   return (
      <div>
         <h1>Welcome To Expensify</h1>
         <button onClick={startLogin}>Login with Google</button>
      </div>
   )
}

const mapDispatchToProps = (dispatch) => ({
   startLogin: () => dispatch(startLogin())
});

export default connect(null, mapDispatchToProps)(LoginPage);