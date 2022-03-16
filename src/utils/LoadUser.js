
function checkForUser(value) {

    if (value) {
        return localStorage.setItem("kwitterUser", value)
    } else {

        let returnValue = localStorage.getItem("kwitterUser")
        return returnValue
    }
}

function logoutUser() {
    localStorage.removeItem("kwitterUser")
}

export { checkForUser, logoutUser }