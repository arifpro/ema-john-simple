import React, { Children, useContext, useEffect } from 'react'
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig)

const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const auth = Auth()
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

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
        firebase.auth().signOut().then(() => {
            setUser(null)
        }).catch(error => {
            console.log(error);
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