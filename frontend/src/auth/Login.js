import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'

const Login = ({login}) => {
  const history = useHistory()
  const {formData, handleChange, resetFormData} = useContext(UserContext)
  
  async function handleSubmit(event) {
    event.preventDefault()
    resetFormData()
    const result = await login(formData)
    console.log('Login.js - handleSubmit - formData.username', formData.username)

    history.push(`/users/${formData.username}`)
  }
  
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