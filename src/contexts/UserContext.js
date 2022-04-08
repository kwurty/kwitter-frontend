import React, { createContext, useState, useEffect } from "react";
import { checkForUser, logoutUser } from '../utils/LoadUser'
import jwt_decode from "jwt-decode";

const UserContext = createContext({ name: '', auth: false });
// This also works: const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ id: undefined, auth: false, username: undefined, displayname: undefined });

    // Login updates the user data with a name parameter
    const login = (user) => {
        // Returns the access token if it is there or it will return null
        if (user) {
            checkForUser(user)
            let temp_user = jwt_decode(user)
            setUser({ "id": temp_user.user_id, "username": temp_user.username, 'auth': true, 'token': user, 'displayname': temp_user.displayname })
        }
    }
    // Logout updates the user data to default
    const logout = () => {
        setUser({ id: undefined, auth: false, username: undefined, token: undefined })
        logoutUser()
    };

    const testToken = async (token) => {

        token = token.replaceAll('"', '')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await fetch(`${process.env.REACT_APP_API_URL}/refresh`, requestOptions)
        let status = await response.status
        if (status === 401) {
            return logoutUser()
        }

        let userInfo = await response.json()
        let accessToken = await userInfo.access_token
        login(accessToken)
    }

    useEffect(() => {

        // test the token to see if it still functions
        let tokenCheck = async (token) => {

            if (!token) return;

            // invoke test call to API
            testToken(token)

            // // if it is still good, invoke the login function
            // if (token_is_valid) {
            //     login(token)
            // }
            // // otherwise, logout so we don't keep checking a bad token
            // else {
            //     // logout()
            // }
        }

        // grab localtoken for testing
        let localStorageToken = checkForUser()

        // test the token
        tokenCheck(localStorageToken)

    }, [])

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContextProvider, UserContext }