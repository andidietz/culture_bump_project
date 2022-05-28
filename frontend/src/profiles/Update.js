import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'
import "react-widgets/styles.css"
import Combobox from "react-widgets/Combobox"

const ProfileUpdate = () => {
  const history = useHistory()

  const {currentUser, setCurrentUser, userTags, setUserTags}  = useContext(UserContext)
  const [allTags, setAllTags] = useState([])
  const [tagsToCompare, setTagsToCompare] = useState([])
  // const [isDuplicateTag, setIsDuplicateTag] = useState(false)
  const {username} = currentUser
  const [formData, setFormData] = useState({
    email: currentUser.email, 
    name: currentUser.name,
    username: currentUser.username, 
    password: '',
    tag: ''
  })


  useEffect(function loadUserProfileInfo() {
    async function getUserInfo() {
      try {
        const allTags = await CultureBumpApi.getTags()
        // console.log('allTags', allTags)
        setAllTags(allTags)

        const userTags = await CultureBumpApi.getUserTags(username)
        // console.log('usersTags', userTags)

        userTags.map(tagInfo => {
          tagsToCompare.push(tagInfo.tag.toUpperCase())
        })

        setUserTags(userTags)
      } catch (error) {
        setUserTags(null)
        setAllTags(null)
      }
    }
    getUserInfo()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const userData = {
      email: formData.email, 
      firstName: formData.firstName, 
      lastName: formData.lastName, 
      password: formData.password,
    } 

    const username = currentUser.username
    const updateUserInfo = await CultureBumpApi.updateProfile(username, userData)

    setFormData(formData => ({...formData, password: ''}))
    setCurrentUser(updateUserInfo)

    history.push(`/users/${username}`)
  }

  const handleChange = event => {
    const {name, value} = event.target

    setFormData(formData => ({
        ...formData,
        [name]: value
    }))
  }


  const addTag = async (event) => {
    event.preventDefault()
    const tagToAdd = formData.tag.tag || formData.tag
    // console.log('tagToAdd', tagToAdd)

    function isDuplicate(tag) {
      return tag === tagToAdd.toUpperCase()
    }
  
    const result = tagsToCompare.filter(isDuplicate)
    // console.log('result', result)


    if (result.length !== 0) {
      console.log('result', result)
      alert('Found Duplicate')
    } else {
      console.log('send to server')
    }

    // tagsToCompare.map(userTag => {
    //   // console.log('tagsToCompare.map', userTag.toUpperCase(), '===', tagToAdd.toUpperCase())
    //   if (userTag.toUpperCase() === tagToAdd.toUpperCase()) {
    //     alert('Found Duplicate')
    //     // setIsDuplicateTag(true)
    //     // console.log('isDuplicateTag', isDuplicateTag)
    //   }
    // })
    
    // if (!isDuplicateTag) {

    //   const tagData = {tag: formData.tag}
    //   // console.log('tagData', tagData)

    //   const username = currentUser.username
    
    //   const res = await CultureBumpApi.addTag(username, tagData)
      
    //   setAllTags(allTags => ([
    //     ...allTags, res.tag 
    //    ]))

    //    setIsDuplicateTag(false)
    //   }
  }
  

  return (
    <div>
      <h1>Update Profile</h1>
      <p>Username: {currentUser.username}</p>
      <form onSubmit={addTag}> 
        <p>Shared Reference Groups:</p>
        {
          userTags && userTags ? 
          userTags.map(tag => <span>{tag.tag} </span>) : null
        }

        <Combobox 
            data={allTags}
            dataKey='id'
            textField='tag'
            placeholder='Japan'
            filter='contains'
            hideEmptyPopup 
            autoSelectMatches
            onChange={(param) => {
              // setIsDuplicateTag(false)
              setFormData(formData => ({
                ...formData,
                tag: param
              }))
            }}
          />
          {/* {isDuplicateTag && isDuplicateTag ? <p>Tag Already Added</p>: null} */}
          <button>Add Tag</button>
        </form>

      <form>
        <label>Name:</label>
        <input 
            id='name'
            name='name'
            placeholder='name'
            type='text'
            value={formData.name}
            onChange={handleChange}/>

        <label>Password:</label>
        <input 
          id='password'
          name='password'
          placeholder='password'
          type='text'
          value={formData.password}
          onChange={handleChange}/>

        <button onSubmit={handleSubmit}>Update User Info</button>
      </form>
    </div>
  )
}

export default ProfileUpdate