import React, {useState, useEffect} from 'react'
import {BrowserRouter} from 'react-router-dom'
import jwt from 'jsonwebtoken'

import Routes from './nav/Routes'
import CultureBumpApi from './api/api'
import UserContext from './context/UserConext'
import Nav from './nav/Nav'
import useLocalStorage from './hooks/useLocalStorage'
import useFields from './hooks/useFields'

import './App.css'

export const TOKEN_IN_STORAGE = "Storage-Token"

function App() {
  // const [infoIsLoaded, setInfoIsLoaded] = useState(false)
  const initialState = {
    username: '',
    password: '',
    type: '', 
    spark: '', 
    thought: '',
    observation: '',
    response: '',
    emotions: '',
    universal: '',
    action: '',
    qualities: '',
    connectionPoint: '',
    id: '',
    headerSituation: '',
    headerSpecification: '',
    tag: '', 
  }

  const [currentUser, setCurrentUser] = useState('')
  const [token, setToken] = useLocalStorage(TOKEN_IN_STORAGE)
  const [userBumps, setUserBumps] = useState([])
  const [userTags, setUserTags] = useState([''])
  const [refPoint, setRefPoint] = useState({    
    id: '',
    headerSituation: '',
    headerSpecification: '',
    tag: '', 
    action: '',
    qualities: ''
  })

  const [formData, handleChange, resetFormData] = useFields(initialState)


  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          const {username} = jwt.decode(token)
          console.log('useEffect - getCurrentUser', username)

          CultureBumpApi.token = token
          console.log('useEffect - CultureBumpApi.token', token)

          const currentUser = await CultureBumpApi.getCurrentUser(username)
          
          console.log('App.js - useEffect - currentUser results', currentUser)

          setCurrentUser(currentUser)
        } catch (err) {
          setCurrentUser(null)
        }
      }
    }

    getCurrentUser()
  }, [token])

  const logout = () => {
    setCurrentUser(null)
    setToken(null)
  }

  async function login(loginData) {
    try {
      // console.log('App.js - login function - parameters', loginData)
      const token = await CultureBumpApi.login(loginData) 
      console.log('App.js - login function - token', token)
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
      <UserContext.Provider value={{
        currentUser, 
        setCurrentUser, 
        userBumps, 
        setUserBumps,
        userTags, 
        setUserTags,
        refPoint, 
        setRefPoint,
        formData,
        handleChange, 
        resetFormData
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
