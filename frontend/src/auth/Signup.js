import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'

const Signup = ({signup}) => {
  const history = useHistory()
  const {formData, handleChange, resetFormData} = useContext(UserContext)
  const {name, username, password, email} = formData

  async function handleSumbit(event) {
    event.preventDefault()
    resetFormData()
    await signup(formData)
    history.push(`/users/${formData.username}`)
  }

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSumbit}>
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