import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import BumpCard from '../cards/Bump'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'
import Loading from '../components/Loading'
import { Container, Row, Card, Col, Button, Badge } from 'react-bootstrap'
import './Profile.css'

const Profile = () => {
  const history = useHistory()
  const [userReferencePoints, setUserReferencePoints] = useState([])
  const {currentUser, userTags, setUserTags}  = useContext(UserContext)

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

  const deleteReferencePoint = async (id) => {
    await CultureBumpApi.deleteReferencePoint(id)
    const userReferencePoints = await CultureBumpApi.getUserReferencePoints(username)
    setUserReferencePoints(userReferencePoints)
  }
  
  const createUserReferencePoints = (referencePoint) => {
    return (
      <div>
        <Container>
          <Row className="justify-content-center">
            <Card style={{ width: '30rem' }}>
              <Row>
                <Col>
                  <Button variant="outline-primary" size="sm"
                    onClick={() => {history.push(`/directory/add/${referencePoint.id}`)}}>
                    Add To Culture Bump Directory
                  </Button>
                </Col>
                <Col>
                  <Button variant="outline-danger" size="sm" onClick={() => {deleteReferencePoint(referencePoint.id)}}>Delete</Button>
                </Col>
              </Row>
              <Row>
                <BumpCard referencePoint={referencePoint}/>
                
              </Row>
            </Card>
          </Row>
        </Container>

      </div>
    )
  }

  if (!currentUser && !userReferencePoints && !userTags) return <Loading/>

  const {username, name, email} = currentUser
  
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Card style={{ width: '30rem' }}>
            <Card.Title>Hi, {username}</Card.Title>
            <Card.Subtitle className='info'>name: {name}</Card.Subtitle>
            <Card.Subtitle className='info'>email: {email}</Card.Subtitle>
            <Button className='edit-button' variant="primary" size="sm" onClick={goToProfileUpdate}>Edit Profile</Button>
          
            <Card.Title className='section-header'>Shared Reference Tags:</Card.Title>
            <Row>
              {
                userTags.length !== 0 ? 
                  userTags.map(tag => <span><Badge size="sm" bg="primary">{tag.tag}</Badge></span>) : 
                  <p>Reference Tags Needed</p>
              }
            </Row>
      
            <Card.Title className='section-header'>My Culture Bumps:</Card.Title>
            {
              userReferencePoints.length !== 0 ? 
                userReferencePoints.map(
                  referencePoint => createUserReferencePoints(referencePoint)) : 
                  <p>No Culture Bumps Found</p>
            }
          </Card>
        </Row>
      </Container>
    </div>
  )
}

export default Profile