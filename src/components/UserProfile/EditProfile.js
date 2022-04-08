import React, { useEffect, useState } from 'react'
import { DebounceInput } from 'react-debounce-input'
import { UserContext } from '../../contexts/UserContext'
import './EditProfile.css'
import { toast } from 'react-toastify';


export default function EditProfile() {

    const [username, setUsername] = useState('')
    const [displayname, setDisplayname] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [displaynameError, setDisplaynameError] = useState('')


    const user = React.useContext(UserContext)
    const emailValidation = (email) => {
        setEmail(email)
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email")
        } else {
            setEmailError(null)
        }
    }

    const usernameValidation = (username) => {
        setUsername(username)
        if (username.length < 5) {
            setUsernameError("Username does not meet minimum length requirements (5)");
        }
        else {
            setUsernameError(null)
        }
    }

    const displaynameValidation = (displayname) => {
        setDisplayname(displayname)
        if (displayname.length < 8) {
            setDisplaynameError("Displayname does not meet minimum length requirements (8)")
        } else {
            setDisplaynameError(null)
        }
    }

    useEffect(() => {

        const retrieveDetails = async () => {
            let myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${user.user.token}`);

            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let user_detail = await fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions)
            let status = await user_detail.status
            if (status === 200) {
                user_detail = await user_detail.json()
                let username = await user_detail.username
                let displayname = await user_detail.displayname
                let email = await user_detail.email
                setUsername(username)
                setDisplayname(displayname)
                setEmail(email)
            }
        }

        retrieveDetails()

    }, [user])


    const submitEdits = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.user.token}`);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        let user_detail = await fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions)
        let status = await user_detail.status
        if (status === 200) {
            user_detail = await user_detail.json()
            let username = await user_detail.username
            let displayname = await user_detail.displayname
            let email = await user_detail.email
            setUsername(username)
            setDisplayname(displayname)
            setEmail(email)
        }

        toast.success('Posted successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: false
        })
    }

    return (
        <div className="edit-user-profile">
            <div className="form">
                <form className="input-form">

                    <label>
                        Display Name
                    </label>
                    <DebounceInput className={`input-field ${displaynameError ? 'error' : ''}`}
                        placeholder="password"
                        debounceTimeout={300}
                        value={displayname}
                        type="text"
                        onChange={(e) => {
                            displaynameValidation(e.target.value)
                        }} >
                    </DebounceInput>
                    <label>
                        Email:
                    </label>
                    <DebounceInput className={`input-field ${emailError ? 'error' : ''}`}
                        placeholder="email address"
                        debounceTimeout={300}
                        value={email}
                        onChange={(e) => {
                            emailValidation(e.target.value)
                        }} >
                    </DebounceInput>
                </form>
                <div>
                    <button onClick={(e) => {
                        e.preventDefault()

                    }}>Update</button>
                </div>

            </div>

        </div>
    )
}
