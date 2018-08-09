import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
    <div>
        <p>404! Page not found - <Link to="/">Go Home</Link> </p>
    </div>
);

export default NotFoundPage;