import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'
import "react-widgets/styles.css"
import Combobox from "react-widgets/Combobox"
import { Card, Container, Form, Row, Badge, Button } from 'react-bootstrap'

const ProfileUpdate = () => {
  const history = useHistory()

  const {currentUser, setCurrentUser, userTags, setUserTags}  = useContext(UserContext)
  const [allTags, setAllTags] = useState([])
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [tagsToCompare, setTagsToCompare] = useState([])
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
        setAllTags(allTags)
        
        const userTags = await CultureBumpApi.getUserTags(username)
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

  useEffect(function updateUserTags() {
    async function getUpdatedUserTags() {
      try {
        const userTags = await CultureBumpApi.getUserTags(username)
        userTags.map(tagInfo => {
          tagsToCompare.push(tagInfo.tag.toUpperCase())
        })

        setUserTags(userTags)
      } catch (error) {
        setUserTags(null)
      }
    }
    getUpdatedUserTags()
  }, [allTags])

  useEffect(() => {
    async function submitToServer() {
      if (Object.keys(formErrors).length === 0 && isSubmitted) {
        const userData = {
          email: formData.email,
          name: formData.name,
        } 
    
        if (formData.password.length !== 0) {
          userData.password = formData.password
        }
    
        const username = currentUser.username
        const result = await CultureBumpApi.updateProfile(username, userData)

        if (result.username) {
          setFormData(formData => ({...formData, password: ''}))
      
          history.push(`/users/${username}`)
        } else {
          setFormErrors(formErrors => ({
            ...formErrors,
            result: true
        }))
        }
      }
    }
    submitToServer()
  }, [formErrors]) 

  const validate = (values) => {
    const errors = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (!values.name) {
      errors.name = "Required"
    } else if (values.name.length <= 2) {
      errors.name = "Name value must be more than 2 characters"
    }

    if (!values.email) {
      errors.email = "Required"
    } else if (!regex.test(values.email)) {
      errors.email = "Not a vaild email"
    }

    if (values.password.length !== 0) {
      if (values.password.length < 5) {
        errors.password = "Password must be more than 5 characters"
      } else if (values.password.length >= 20) {
        errors.password = "Password must be less than 20 characters"
      }
    }

    return errors
  }

  const validateTags = (values) => {
    const errors = {}

    if (!values.tag) {
      errors.tag = "Please fill tag field"
    }
    setIsSubmitted(false)
    return errors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormErrors(validate(formData))
    setIsSubmitted(true)
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
    setFormErrors(validateTags(formData))

    if (!formErrors.tag) {    
      const tagToAdd = formData.tag.tag || formData.tag
      function isDuplicate(tag) {
        return tag === tagToAdd.toUpperCase()
      }
    
      const result = tagsToCompare.filter(isDuplicate)
  
      if (result.length !== 0) {
        // TODO: Alert
        alert('Found Duplicate')
      } else {
        const tagData = {tag: formData.tag}
        const username = currentUser.username
      
        const res = await CultureBumpApi.addTag(username, tagData)
        
        setAllTags(allTags => ([
          ...allTags, res.tag 
         ]))
      }
    }
  }
  
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Card style={{ width: '25rem' }}>
            <Card.Title>Update Profile</Card.Title>
            <Card.Subtitle>Username: {currentUser.username}</Card.Subtitle>
            <Card.Subtitle>Shared Reference Groups:</Card.Subtitle>
            {
              userTags && userTags ? 
              userTags.map(tag => <span><Badge size="sm" bg="primary">{tag.tag}</Badge></span>) : null
            }
            <Form onSubmit={addTag}>
              <Form.Group className="mb-3">
                <Form.Label>User Tag</Form.Label>
                  <Combobox 
                    data={allTags}
                    dataKey='id'
                    textField='tag'
                    placeholder='Japan'
                    filter='contains'
                    hideEmptyPopup 
                    autoSelectMatches
                    onChange={(param) => {
                      setFormData(formData => ({
                        ...formData,
                        tag: param
                      }))
                    }}
                  />
                <Form.Text>{formErrors.tag}</Form.Text>   
                <Button type='submit'>Add Tag</Button>
              </Form.Group>
            </Form>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  id='name'
                  name='name'
                  placeholder='name'
                  type='text'
                  value={formData.name}
                  onChange={handleChange}/>
                <Form.Text>{formErrors.name}</Form.Text>
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  id='email'
                  name='email'
                  placeholder='email'
                  type='text'
                  value={formData.email}
                  onChange={handleChange}/>
                <Form.Text>{formErrors.email}</Form.Text>
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  id='password'
                  name='password'
                  placeholder='password'
                  type='text'
                  value={formData.password}
                  onChange={handleChange}/>
                <Form.Text>{formErrors.password}</Form.Text>
              </Form.Group>
              <Button type='submit'>Update User Info</Button>
            </Form>
          </Card>
        </Row>
      </Container>
    </div>
  )
}

export default ProfileUpdate