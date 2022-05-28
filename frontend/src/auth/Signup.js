import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'

const Signup = ({signup}) => {
  const history = useHistory()
  const {currentUser} = useContext(UserContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '', 
    password: ''
  })
  const {name, username, password, email} = formData

  useEffect(function waitForCurrentUser() {
    if (currentUser) {
      history.push(`/users/${currentUser.username}`)
    }
  }, [currentUser])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await signup(formData)
    history.push(`/users/${formData.username}`)
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
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          id='name'
          name='name'
          placeholder='name'
          type='text'
          value={name}
          onChange={handleChange}/>
        <input 
          id='username'
          name='username'
          placeholder='username'
          type='text'
          value={username}
          onChange={handleChange}/>
        <input 
          id='email'
          name='email'
          placeholder='email'
          type='text'
          value={email}
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

export default Signup