import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

const Login = ({formData, handleChange, resetFormData}) => {
  const history = useHistory()
  
  const handleSumbit = event => {
    event.preventDefault()
    resetFormData()
    history.push('/directory')
  }

  const {username, password} = formData
  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSumbit}>
        <label>Username</label>
        <input 
          id='username'
          name='username'
          type='text'
          value={username}
          onChange={handleChange}/>
        <input           
          id='password'
          name='password'
          type='text'
          value={password}
          onChange={handleChange}/>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Login