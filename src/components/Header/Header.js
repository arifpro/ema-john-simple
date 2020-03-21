import React, { useContext, useState, useRef, useEffect } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import Auth from '../Login/useAuth';
import { faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Router } from 'react-router-dom';
// import { UserContext } from '../../Login/useAuth';


// const usePrevious = value => {
//     const prev = useRef()
//     useEffect(() => {
//         prev.current = value
//     }, [value])
//     return prev.current
// }


const Header = () => {
    // const user = useContext(UserContext)
    // const [count, setCount] = useState(0)
    // const previous = usePrevious(count)
    const auth = Auth()
    // console.log(auth.user);
    return (
        <div className="header">
            <img src={logo} alt="" />
            {/* <h1>Count: {count} Previous: {previous}</h1>
            <button onClick={() => setCount(count+1)}>+</button>
            <button onClick={() => setCount(count-1)}>-</button> */}
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                {
                    auth.user &&
                    <a href="/login" style={{ color: 'yellow' }}>
                        Welcome, {auth.user.name}
                    </a>
                }
                {
                    auth.user ? <a href="/login">Sign out</a>
                    : <a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;