import React, {useContext} from 'react'
import Link from 'react-router-dom'
import UserContext from '../auth/UserConext'
import DirectoryList from '../directory/List'

const Home = () => {
  const {currentUser} = useContext(UserContext)

  const loggedOutComponents = () => {
    return (
      <div>
      <Link to='/signup'>
        Signup
      </Link>
      <Link to='/login'>
        Log in
      </Link>
    </div>
    )
  }
  
  return (
    <div>
      {currentUser ? <DirectoryList/> : loggedOutComponents()}
    </div>
  )
}

export default Home