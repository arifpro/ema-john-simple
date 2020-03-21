// Hook (use-auth.js)
import React, { useContext, useEffect, useState, createContext } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { Route, Redirect } from 'react-router-dom';

// Add your Firebase credentials
firebase.initializeApp(firebaseConfig)

const AuthContext = createContext()

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const AuthContextProvider = (props) => {
    const auth = Auth()
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(AuthContext)



export const PrivateRoute = ({children, ...rest}) => {
    const auth = useAuth()
    return (
        <Route
            {...rest}
            render = {({location}) => 
                auth.user ? (children) : (
                    <Redirect
                        to={{pathname: '/login',
                        state: {from: location}
                    }}
                    ></Redirect>
                )
            }
        ></Route>
    )
}

const getUser = user => {
    const { displayName, email, photoURL } = user
    return { name: displayName, email, photo: photoURL }
}

const Auth = () => {
    const [user, setUser] = useState(null)

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                // console.log(res);
                const signedInUser = getUser(res.user)
                setUser(signedInUser)
                return res.user
            })
            .catch(err => {
                // console.log(err)
                setUser(null)
                return err.message
            });
    }
    const signOut = () => {
        return firebase.auth().signOut().then(() => {
            setUser(null)
            return true
        }).catch(error => {
            console.log(error);
            return false
        })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(usr => {
            if(usr){
                const currUser = getUser(usr)
                setUser(currUser)
            }
        })
    }, [])

    return {
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth