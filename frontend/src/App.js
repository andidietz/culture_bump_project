import React, {useState, useEfect, useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import jwt from 'jsonwebtoken'

import Routes from './nav/Routes'
import CultureBumpApi from './api/api'
import UserContext from './context/UserConext'
import RefContext from './context/RefContext'
import Nav from './nav/Nav'
import useLocalStorage from './hooks/useLocalStorage'

import './App.css'

const TOKEN_IN_STORAGE = "Storage-Token"

function App() {
  const [infoIsLoaded, setInfoIsLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_IN_STORAGE)
  const [userBumps, setUserBumps] = useState([])
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
          const userBumps = await CultureBumpApi.getUserBumps(username)
          const userTags = await CultureBumpApi.getUserTags(username)
          setCurrentUser(currentUser)
          setUserBumps(userBumps)
          setUserTags(userTags)
        } catch (err) {
          setCurrentUser(null)
        }
      }
      setInfoIsLoaded(true)
    }
    setInfoIsLoaded(false)
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


  return (
    <BrowserRouter>
      <UserContext.Provider values={{
        currentUser, 
        setCurrentUser, 
        userBumps, 
        setUserBumps,
        userTags, 
        setUserTags
      }}>
        <RefContext.Provider values={{
          currentUser, 
          setCurrentUser, 
          refPoint, 
          setRefPoint
        }}>
          <div>
            <Nav logout={logout}/>
            <Routes login={login} signup={signup} />
          </div>
        </RefContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
