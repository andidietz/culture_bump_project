import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'

const Login = ({login}) => {
  const history = useHistory()
  const {currentUser} = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  })
  const {username, password} = formData

  useEffect(function waitForCurrentUser() {
    if (currentUser) {
      history.push(`/users/${currentUser.username}`)
    }
  }, [currentUser])


  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await login(formData)
    setFormData(formData => ({...formData, password: ''}))

    history.push(`/users/${username}`)
  }

  const handleChange = event => {
    const {name, value} = event.target

    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
  }

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