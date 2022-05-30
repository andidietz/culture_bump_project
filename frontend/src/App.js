import React, {useState, useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import jwt from 'jsonwebtoken'

import Routes from './nav/Routes'
import CultureBumpApi from './api/api'
import UserContext from './context/UserConext'
import Nav from './nav/Nav'
import useLocalStorage from './hooks/useLocalStorage'
import useFields from './hooks/useFields'
import Loading from './components/Loading'


import 'bootstrap/dist/css/bootstrap.min.css'

export const TOKEN_IN_STORAGE = "Storage-Token"

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [token, setToken] = useLocalStorage(TOKEN_IN_STORAGE)
  const [userTags, setUserTags] = useState([])
  const [refPoint, setRefPoint] = useState({    
    id: '',
    headerSituation: '',
    headerSpecification: '',
    tag: '', 
    action: '',
    qualities: ''
  })

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          const {username} = jwt.decode(token)

          CultureBumpApi.token = token

          const currentUser = await CultureBumpApi.getCurrentUser(username)

          setCurrentUser(currentUser)
        } catch (err) {
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true)
    }
    setInfoLoaded(false)
    getCurrentUser()
  }, [token])

  const logout = () => {
    setCurrentUser(null)
    setToken(null)
  }

  async function login(loginData) {
    try {
      const token = await CultureBumpApi.login(loginData) 
      setToken(token)
      return {sucess: true}
    } catch (err) {
      return {success: false, err}
    }
  }

  async function signup(signupData) {
    try {
      const token = await CultureBumpApi.signup(signupData)
      setToken(token)
      return {sucess: true}
    } catch (err) {
      return {sucess : false, err}
    }
  }

  if (!infoLoaded) return <Loading/>

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        currentUser, 
        setCurrentUser,
        userTags, 
        setUserTags
      }}>
        <div>
          <Nav logout={logout}/>
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
