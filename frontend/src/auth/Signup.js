import React from 'react'
import {useHistory} from 'react-router-dom'

const Signup = ({formData, handleChange, resetFormData}) => {
  const history = useHistory()

  const handleSumbit = event => {
    event.preventDefault()
    resetFormData()
    const {username} = event.target.username.value
    history.push(`/users/${username}`)
  }

  const {name, username, password} = formData

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSumbit}>
        <input 
          id='name'
          name='name'
          type='text'
          value={name}
          onChange={handleChange}/>
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

export default Signup