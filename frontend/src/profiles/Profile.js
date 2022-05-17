import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import BumpCard from '../cards/Bump'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'

// Need to toggle My Bookmarks on button click
const Profile = () => {
  const history = useHistory()
  // console.log('history', history)
  // console.log('UserContext', UserContext)

  const userInfo = useContext(UserContext)
  const {setUserBumps, setUserTags, userTags, userBumps} = userInfo
  const {username, name, email} = userInfo.currentUser

  console.log('userInfo', userInfo)

  useEffect(function loadUserProfileInfo() {
    async function getUserInfo() {
      try {
        console.log('useEffect -profile - getUserInfo - username', username)

        const userBumps = await CultureBumpApi.getUserBumps(username)
        const userTags = await CultureBumpApi.getUserTags(username)
        // console.log('useEffect - getUserInfo - userBumps', userBumps)
        // console.log('useEffect - getUserInfo - userTags', userTags)

        setUserBumps(userBumps)
        setUserTags(userTags)
      } catch (error) {
        setUserBumps(null)
        setUserTags(null)
      }
    }
    getUserInfo()
  }, [])


  const goToProfileUpdate = event => {
    history.push(`/users/${username}/update`)
  }

  return (
    <div>
      <h2>Hi, {username}</h2>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <button onClick={goToProfileUpdate}>Edit Profile</button>
      <h3>Shared Reference Tags:</h3>
        {userTags && userTags ? userTags.map(tag => <span>{tag}</span>) : <p>Reference Tags Needed</p>}
      <button>My Bumps</button>
      <button>My Bookmarks</button>
      <h3>My Culture Bumps</h3>
        {userBumps && userBumps ? userBumps.map(bump => <BumpCard bump={bump}/>) : <p>No Culture Bumps Found</p>}
      {/* <h3>My Bookmarks</h3>
        {refPoints.map(refPoint => <refPointCard refPoint={refPoint}/>)} */}
    </div>
  )
}

export default Profile