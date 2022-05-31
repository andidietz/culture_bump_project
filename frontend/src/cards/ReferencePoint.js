import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import './ReferencePoint.css'
const ReferencePoint = ({  
    tag,  
    action, 
    headerSituation, 
    headerSpecification, 
    qualities
  }) => {

  return (
    <div>
      <Container className='details-componenet'>
        <Card className="text-center card">
          <Row className='title'>
            <Card.Title>Reference Point</Card.Title>
          </Row>
          <Row>
            <Col>
              <Card.Subtitle>Situation</Card.Subtitle>
            </Col>

            <Col>
              <Card.Subtitle>Specific Location or Detail</Card.Subtitle>
            </Col>

            <Col>
              <Card.Subtitle>General Shared Reference Group</Card.Subtitle>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Body>{headerSituation}</Card.Body>
            </Col>

            <Col>
              <Card.Body>{headerSpecification}</Card.Body>
            </Col>

            <Col>
              <Card.Body>{tag}</Card.Body>
            </Col>
          </Row>
          <Row className='personal-details-section'>
              <Card.Subtitle>I would ...</Card.Subtitle>
              <Card.Body className='spacer'>{action}</Card.Body>

              <Card.Subtitle className='spacer'>When I do this, I am being...</Card.Subtitle>
              <Card.Body>{qualities}</Card.Body>
          </Row>
          <Row>
            <Card.Body className='question-section'>
              What about you? Think about how you express these qualities in your life?
            </Card.Body>
          </Row>
        </Card>
      </Container>     
    </div>
  )
}

export default ReferencePoint