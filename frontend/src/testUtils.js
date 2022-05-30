import React from 'react'
import UserContext from './context/UserConext'

const demoUser = {
  username: 'testUser',
  name: 'testName',
  email: 'email@gmail.com'
}

const UserProvider = ({children, currentUser = demoUser}) => {
  <UserContext.Provider value={({currentUser})}>
    {children}
  </UserContext.Provider>
}

export {UserProvider}