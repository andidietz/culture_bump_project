import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'

const ProfileUpdate = () => {
  const history = useHistory()
  const { 
    formData, 
    handleChange, 
    resetFormData
  } = useContext(UserContext)

  const {name, username, password, userTags} = formData

  const handleSumbit = event => {
    event.preventDefault()
    resetFormData()
    const {username} = event.target.username.value
    history.push(`/users/${username}`)
  }
  // TODO: userTags - Select Options
  return (
    <div>
      <h1>Update Profile</h1>
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
          id='password'
          name='password'
          placeholder='password'
          type='text'
          value={password}
          onChange={handleChange}/>
        <input 
          id='userTags'
          name='userTags'
          placeholder='userTags'
          type='text'
          value={userTags}
          onChange={handleChange}/>
        <button>submit</button>
      </form>

    </div>
  )
}

export default ProfileUpdate