import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import BumpCard from '../cards/Bump'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'
import Loading from '../components/Loading'

const Profile = () => {
  const history = useHistory()
  const [userReferencePoints, setUserReferencePoints] = useState([])
  const {currentUser, userTags, setUserTags}  = useContext(UserContext)

  const {username, name, email} = currentUser

  useEffect(function loadUserProfileInfo() {
    async function getUserInfo() {
      try {
        const userReferencePoints = await CultureBumpApi.getUserReferencePoints(username)
        const userTags = await CultureBumpApi.getUserTags(username)

        setUserReferencePoints(userReferencePoints)
        setUserTags(userTags)
      } catch (error) {
        setUserReferencePoints(null)
        setUserTags(null)
      }
    }
    getUserInfo()
  }, [])

  const goToProfileUpdate = event => {
    history.push(`/users/${username}/update`)
  }
  
  const createUserReferencePoints = (referencePoint) => {
    return (
      <div>
        <button 
          onClick={() => {history.push(`/directory/add/${referencePoint.id}`)}}>
          Add To Culture Bump Directory
        </button>
        <BumpCard referencePoint={referencePoint}/>
      </div>
    )
  }

  if (!userReferencePoints && !userTags) return <Loading/>

  return (
    <div>
      <h2>Hi, {username}</h2>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <button onClick={goToProfileUpdate}>Edit Profile</button>
      <h3>Shared Reference Tags:</h3>
        {
          userTags && userTags ? 
            userTags.map(tag => <span>{tag.tag} </span>) : 
            <p>Reference Tags Needed</p>
        }
      <button>My Bumps</button>
      <button>My Bookmarks</button>
      <h3>My Culture Bumps</h3>
        {
          userReferencePoints && userReferencePoints ? 
            userReferencePoints.map(
              referencePoint => createUserReferencePoints(referencePoint)) : 
              <p>No Culture Bumps Found</p>
        }
    </div>
  )
}

export default Profile