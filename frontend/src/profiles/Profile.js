import React, {useContext} from 'react'
import BumpCard from '../cards/Bump'
import RefContext from '../context/RefContext'
import UserContext from '../context/UserConext'

// Need to toggle My Bookmarks on button click
const Profile = () => {
  const {username, tags, bumps} = useContext(UserContext)

  return (
    <div>
      <h2>{username}</h2>
      <button>Edit Profile</button>
      <p>Shared Reference Tags:</p>
        {tags.map(tag => <span>{tag}</span>)}
      <button>My Bumps</button>
      <button>My Bookmarks</button>
      <h3>My Culture Bumps</h3>
        {bumps.map(bump => <BumpCard bump={bump}/>)}
      {/* <h3>My Bookmarks</h3>
        {refPoints.map(refPoint => <refPointCard refPoint={refPoint}/>)} */}
    </div>
  )
}

export default Profile