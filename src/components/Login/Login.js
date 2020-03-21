import React from 'react';
import './Login.css'
import signInBtn from '../../images/login-with-google-button.png'
import signOutBtn from '../../images/logout.jpg'
import Auth from './useAuth';

const Login = () => {
    const auth = Auth()
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
            // console.log('redirect now');
            window.location.pathname = '/review'
        })
    }
    // console.log(auth);
    const handleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = '/'
        })
    }
    return (
        <div className="main">
            <h1>Join the party!!!</h1>

            {
                auth.user ? 
                // <button onClick={auth.signOut}>Sign out</button> 
                <button onClick={handleSignOut}>
                    <img src={signOutBtn} alt="" />
                </button>
                :
                // <button onClick={auth.signInWithGoogle}>Sign in with Google</button>
                <button onClick={handleSignIn}>
                    <img src={signInBtn} alt="" />
                </button>
            }
        </div>
    );
};

export default Login;