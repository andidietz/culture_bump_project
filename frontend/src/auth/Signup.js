import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Button, Form, Card, Container, Row} from 'react-bootstrap'

const Signup = ({signup}) => {
  const history = useHistory()
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '', 
    password: ''
  })
  const {name, username, password, email} = formData

  useEffect(() => {
    async function submitToServer() {
      if(Object.keys(formErrors).length === 0 && isSubmitted) {

          const result = await signup(formData)

          if (result.sucess) {
            setFormData(formData => ({...formData, password: ''}))
            history.push(`/users/${formData.username}`)
          } else {
            setFormErrors(formErrors => ({
              ...formErrors,
              result: 'Username or Email already in use'
            }))
          }
      }
    }
    submitToServer()
  }, [formErrors]) 

  const validate = (values) => {
    const errors = {}
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    
    if (!values.name) {
      errors.name = "Required"
    } else if (values.name.length <= 2) {
      errors.name = "Name value must be more than 2 characters"
    }

    if (!values.username) {
      errors.username = "Required"
    } else if (values.username.length <= 2) {
      errors.username = "Username value must be more than 2 characters"
    }

    if (!values.email) {
      errors.email = "Required"
    } else if (!regex.test(values.email)) {
      errors.email = "Not a vaild email"
    }

    if (!values.password) {
      errors.password = "Required"
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 5 characters"
    } else if (values.password.length >= 20) {
      errors.password = "Password must be less than 20 characters"
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
          
          <Card.Title>Sign up</Card.Title>
          <Form onSubmit={handleSubmit}>
          <Form.Text>{formErrors.result}</Form.Text>   

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                id='name'
                name='name'
                placeholder='name'
                type='text'
                value={name}
                onChange={handleChange}/>
              <Form.Text>{formErrors.name}</Form.Text>   

            </Form.Group>

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
            <Form.Label>Email</Form.Label>            
              <Form.Control 
                id='email'
                name='email'
                placeholder='email'
                type='text'
                value={email}
                onChange={handleChange}/>
              <Form.Text>{formErrors.email}</Form.Text>   

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

export default Signup