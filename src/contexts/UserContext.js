import React, { createContext, useState, useEffect } from "react";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // the value that will be given to the context
    const [user, setUser] = useState(null);

    // fetch a user from a fake backend API
    useEffect(() => {
        const fetchUser = () => {
            // this would usually be your own backend, or localStorage
            // for example
            if (localStorage.getItem('kwurty-simple-posts')) {
                fetch("https://kwurty-fastapi-tutorial.herokuapp.com/posts", {
                    headers: {
                        "Authorization": localStorage.getItem('kwurty-simple-posts')
                    }
                })
                    .then((response) => {
                        if (response.status === 401) {
                            return localStorage.removeItem('kwurty-simple-posts')
                        }

                    })
                    .catch((error) => console.log("error!"));
            }

        };

        fetchUser();
    }, []);

    return (
        // the Provider gives access to the context to its children
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserContextProvider };