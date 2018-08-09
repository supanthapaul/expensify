// Higher Order Component (HOC) - a component that renders another component
// reuse code
// render hijacking
// prop manupulation
// abstract state

import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

// const withAdminWarning = (WrappedComponent) => {
//     // higher order component
//     return (props) => (
//         <div>
//             {props.isAdmin && <p>This is private info. Please don't share!</p>}
//             {/* Props are spreaded to the child component*/}
//             <WrappedComponent {...props} />
//         </div>
//     )
// }

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {/* Props are spreaded to the child component*/}
            {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>You are not authenticated.</p>}
        </div>
    )
}

// pass Info component as child
const AuthInfo = requireAuthentication(Info);
// const AdminInfo = withAdminWarning(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="Here are some info" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="Here are some info" />, document.getElementById('app'));