import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import BumpCard from '../cards/Bump'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'
import Loading from '../components/Loading'
import bootstrap from 'bootstrap'
import { Container, Row, Card, Col, Button, Badge } from 'react-bootstrap'

const Profile = () => {
  const history = useHistory()
  const [userReferencePoints, setUserReferencePoints] = useState([])
  const {currentUser, userTags, setUserTags}  = useContext(UserContext)

  // const {username, name, email} = currentUser

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

  if (!userReferencePoints && !userTags && !currentUser) return <Loading/>

  const {username, name, email} = currentUser
  
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Card style={{ width: '30rem' }}>
            <Card.Title>Hi, {username}</Card.Title>
            <Card.Subtitle>name: {name}</Card.Subtitle>
            <Card.Subtitle>email: {email}</Card.Subtitle>
            <Button variant="primary" size="sm" onClick={goToProfileUpdate}>Edit Profile</Button>
          
            <Card.Title>Shared Reference Tags:</Card.Title>
            <Row>
              {
                userTags && userTags ? 
                  userTags.map(tag => <span><Badge size="sm" bg="primary">{tag.tag}</Badge></span>) : 
                  <p>Reference Tags Needed</p>
              }
            </Row>
      
            <Card.Title>My Culture Bumps:</Card.Title>
            {
              userReferencePoints && userReferencePoints ? 
                userReferencePoints.map(
                  referencePoint => createUserReferencePoints(referencePoint)) : 
                  <p>No Culture Bumps Found</p>
            }
          </Card>

        </Row>
      </Container>
      {/* <h2>Hi, {username}</h2>
      <p>name: {name}</p>
      <p>email: {email}</p>
      <button variant="primary" onClick={goToProfileUpdate}>Edit Profile</button>
      <h3>Shared Reference Tags:</h3>
        {
          userTags && userTags ? 
            userTags.map(tag => <Badge bg="primary">{tag.tag}</Badge>) : 
            <p>Reference Tags Needed</p>
        }
      <h3>My Culture Bumps</h3>
        {
          userReferencePoints && userReferencePoints ? 
            userReferencePoints.map(
              referencePoint => createUserReferencePoints(referencePoint)) : 
              <p>No Culture Bumps Found</p>
        } */}
    </div>
  )
}

export default Profile