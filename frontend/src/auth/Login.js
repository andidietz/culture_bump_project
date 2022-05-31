import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Form, Card, Container, Row} from 'react-bootstrap'

const Login = ({login}) => {
  const history = useHistory()
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    username: '', 
    password: ''
  })
  const {username, password} = formData

  useEffect(() => {
    async function submitToServer() {
      if(Object.keys(formErrors).length === 0 && isSubmitted) {
        const result = await login(formData)

        if (result.sucess) {
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
    const keys = [
      'username',
      'password'
    ]

    for (let i = 0; i < keys.length; i++) {
      if (!values[keys[i]]) {
        errors[keys[i]] = "Required"
      }
    }
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

  return (
    <div>
      <Container >
        <Row className="justify-content-center">
        <Card className='border d-flex align-items-center justify-content-center' style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Form onSubmit={handleSubmit}>
          {formErrors.result ? <Form.Text>Invalid Username or Password</Form.Text> : null}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                id='username'
                name='username'
                placeholder='username'
                type='text'
                value={username}
                onChange={handleChange}/>
              <Form.Text>{formErrors.username}</Form.Text>   

            </Form.Group>

            <Form.Group className="mb-3">   
            <Form.Label>Password</Form.Label>            
              <Form.Control 
                id='password'
                name='password'
                placeholder='password'
                type='text'
                value={password}
                onChange={handleChange}/>
              <Form.Text>{formErrors.password}</Form.Text>   

            </Form.Group>
          <Button variant="primary" type="submit">Login</Button>
        </Form>
        </Card.Body>
      </Card>
        </Row>
      </Container>
    </div>
  )
}

export default Login