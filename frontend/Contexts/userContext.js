import React  from 'react'


const setUser = (userData) => {
    userInfo.user = userData
}

const userInfo = {
    user: {},
    setUser
}

const userContext = React.createContext(userInfo)

export default userContext

