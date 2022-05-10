import React, {useContext} from 'react'
import {Link, NavLink} from 'react-router-dom'
import UserContext from '../context/UserConext'

const Nav = ({logout}) => {
  console.debug("Navigation", "currentUser=", currentUser);

  const {currentUser} = useContext(UserContext)
  const loggedInNav = () => {
    return (
      <ul>
        <li>
          <NavLink to='/directory'>
            Culture Bump Directory
          </NavLink>
        </li>
        <li>
          <NavLink to='/steps/add'>
            8 Step Tool
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${currentUser.username}`}>
            Profile
          </NavLink>
        </li>
        <li>
          <Link to='/' onClick={logout}>
            Log out
          </Link>
        </li>
      </ul>
    )
  }

  const loggedOutNav = () => {
    return (
      <ul>
        <li>
          <NavLink to='/users/signup'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users/login'>
            Login
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <nav>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  )
}

export default Nav