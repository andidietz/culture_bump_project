import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'

const Login = ({login}) => {
  const history = useHistory()
  const {formData, handleChange, resetFormData, currentUser} = useContext(UserContext)
  
    useEffect(function loadUserProfileInfo() {
      if (currentUser) {
        history.push(`/users/${currentUser.username}`)
      }
    }, [currentUser])


  async function handleSubmit(event) {
    event.preventDefault()
    const result = await login(formData)

    console.log('Login.js - handleSubmit - formData.username', formData.username)
    
    resetFormData()
  }



  // function GoToPage() {
  //   history.push(`/users/${formData.username}`)
  // }
  
  // useEffect(function loadUserProfileInfo() {
  //   async function getUserInfo() {
  //     try {
  //       history.push(`/users/${formData.username}`)
  //     } catch (error) {

  //     }
  //   }
  //   getUserInfo()
  // }, [submitted])


  const {username, password} = formData

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input 
          id='username'
          name='username'
          placeholder='username'
          type='text'
          value={username}
          onChange={handleChange}/>
        <input           
          id='password'
          name='password'
          placeholder='password'
          type='text'
          value={password}
          onChange={handleChange}/>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Login