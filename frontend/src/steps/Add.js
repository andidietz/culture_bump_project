import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../context/UserConext'
import {useHistory} from 'react-router-dom'
import {
  Step1Tips,
  Step2Tips,
  Step3Tips,
  Step4Tips,
  Step5Tips,
  Step6Tips,
  Step7Tips
} from '../components/StepTips'
import CultureBumpApi from '../api/api'
import TipCard from '../cards/Tip'
import {Card, Form, Container, Row, Button} from 'react-bootstrap'
import './Add.css'

const StepsAddForm = () => {
  const history = useHistory()
  const {currentUser} = useContext(UserContext)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    type: '', 
    spark: '', 
    thought: '',
    observation: '',
    response: '',
    emotions: '',
    universal: '',
    action: '',
    qualities: '',
    connectionPoint: ''
  })
  const {  
    type, 
    spark, 
    thought,
    observation,
    response,
    emotions,
    universal,
    action,
    qualities,
    connectionPoint
  } = formData

  useEffect(() => {
    async function submitToServer() {
      if(Object.keys(formErrors).length === 0 && isSubmitted) {  
        const referencePointData = {
          type, 
          spark, 
          thought,
          observation,
          response,
          emotions,
          universal,
          action,
          qualities,
          connectionPoint,
          username: currentUser.username
        } 
  
        await CultureBumpApi.addReferencePoint(referencePointData)
        setFormData(formData => ({...formData}))
        
        history.push(`/directory`)
      }
    }
    submitToServer()
  }, [formErrors]) 
  
  const validate = (values) => {

    const errors = {}
    const keys = [
      'type',
      'spark', 
      'thought',
      'observation',
      'response',
      'emotions',
      'universal',
      'action',
      'qualities',
      'connectionPoint']

    for (let i = 0; i < keys.length; i++) {
      if (!values[keys[i]]) {
        errors[keys[i]] = "Answer is required"
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
      <Container className='steps-component'>
        <Row>
          <h1>8 Steps</h1>
          <p>
            Two things happen in the brain when we encounter a differnce. 
            A mental disconnection (why would they do that?) and a Emotional disconnection
            (I still feel (insert emotion here) about that situation or person).
          </p>
          <p>
             Studies show there are certain steps that need to happen in order to unhook from our emotions, 
             work through what happened, and repair the two disconnection that happened at the time 
             of the culture bump. 
          </p>
          <p>
            The 8 Step tool walks you through those steps and gives you the power to connect and 
            reconnect with anyone anywhere.
          </p>
          <Form>
          <h3>Detach from the culture bump</h3>
            <Card>
              <Row className='tip'>
                <Card.Title>Step 1: Pinpoint The Culture Bump</Card.Title>
                <TipCard Tip={<Step1Tips/>}/>    
              </Row>    

              <Row className='inputs'>
              <Form.Group>
                <label>I had a </label>
                <input
                  id='type'
                  name='type'
                  placeholder='ex: positive'
                  type='text'
                  required
                  value={formData.type}
                  onChange={handleChange}
                />
                <label>culture bump with </label>
                <input
                  id='spark'
                  name='spark'
                  placeholder='ex: person(s) or object(s)'
                  type='text'
                  value={formData.spark}
                  onChange={handleChange}
                />
                <label>and I thought that was</label>
                <input
                  id='thought'
                  name='thought'
                  placeholder='ex: surprising, rude, cute, etc.'
                  type='text'
                  value={formData.thought}
                  onChange={handleChange}
                />
              </Form.Group>
           
              <Form.Text>{formErrors.type}</Form.Text>
              <Form.Text>{formErrors.spark}</Form.Text>
              <Form.Text>{formErrors.thought}</Form.Text>
              </Row>
            </Card>

            <Card>
              <Row className='tip'>
                <Card.Title>Step 2: Describe What The Other Person(s) Did</Card.Title>
                <TipCard Tip={<Step2Tips/>}/>    
              </Row>    

              <Row className='inputs'>
                <Form.Group>
                  <Form.Label>What did the other person(s) do or say?
                    Or, in case of an object, describe it physically.</Form.Label>
                  <Form.Control
                    id='observation'
                    name='observation'
                    placeholder=
                      {'ex: they looked at the sign that said "No Entrance" and walked into the door'}
                    type='text'
                    value={observation}
                    onChange={handleChange}/>
                  <Form.Text>{formErrors.observation}</Form.Text>
                </Form.Group>
              </Row>
            </Card>
 
            <Card>
                <Row className='tip'>
                  <Card.Title>Step 3: Describe What You Did</Card.Title>
                  <TipCard Tip={<Step3Tips/>}/>    
                </Row>    

                <Row className='inputs'>
                  <Form.Group>
                    <Form.Label>What did I do or say?</Form.Label>
                    <Form.Control
                      id='response'
                      name='response'
                      placeholder=
                        'ex: I looked at them, sighed, and remained sitting'
                      type='text'
                      value={response}
                      onChange={handleChange}/>
                    <Form.Text>{formErrors.response}</Form.Text>
                  </Form.Group>
                </Row>
            </Card>
 
            <Card>
                <Row className='tip'>
                  <Card.Title>Step 4: List The Emotions You Felt When The Bump Happened</Card.Title>
                  <TipCard Tip={<Step4Tips/>}/>    
                </Row>    

                <Row className='inputs'>
                  <Form.Group>
                    <Form.Label>At the time of the culture bump, the emotions I felt were:</Form.Label>
                    <Form.Control
                      id='emotions'
                      name='emotions'
                      placeholder=
                        'ex: surprised, nervous, disappointed, out of place'
                      type='text'
                      value={emotions}
                      onChange={handleChange}/>
                    <Form.Text>{formErrors.emotions}</Form.Text>
                  </Form.Group>
                </Row>
            </Card>
           
            <h3>Discover our commonalities</h3>
            <Card>
                <Row className='tip'>
                  <Card.Title>
                    Step 5: Find The Universal Situation In
                    The Incident When It Happened
                  </Card.Title>
                  <TipCard Tip={<Step5Tips/>}/>    
                </Row>    

                <Row className='inputs'>
                <Form.Group>
                  <Form.Label>
                    Now let's find a universal situation for your culture bump.
                    It will be something that could happen to anyone from anywhere,
                    like arriving late or feeling hungry in class or a meeting.
                  </Form.Label>
                  <Form.Label>Find the universal situation in this incident.
                    (What is the situation that they were responding to?)</Form.Label>
                  <Form.Control
                    id='universal'
                    name='universal'
                    placeholder=
                      'ex: Wanting to ignore a rule'
                    type='text'
                    value={universal}
                    onChange={handleChange}/>
                  <Form.Text>{formErrors.universal}</Form.Text>
                </Form.Group>
                </Row>
            </Card>
 
            <Card> 
                <Row className='tip'>
                  <Card.Title>
                    Step 6: List And Describe Specific Actions You
                    Would Do In The Universal Situation From Step 5
                  </Card.Title>
                  <TipCard Tip={<Step6Tips/>}/>    
                </Row>    

                <Row className='inputs'>
                  <Form.Group>
                    <Form.Label>List and describe specific actions you would do in the
                      universal situation from Step 5.
                    </Form.Label>
                    <Form.Control
                      id='action'
                      name='action'
                      placeholder=
                      {`ex: I would complain to my friends and I would find out the
                        reasons behind the rule, but in the end, I would still follow
                        the rule anyways`}
                      type='text'
                      value={action}
                      onChange={handleChange}/>
                    <Form.Text>{formErrors.action}</Form.Text>
                  </Form.Group>
                </Row>
            </Card>
 
            <Card>
              <Row className='tip'>
                <Card.Title>
                  Step 7: List The Qualities That You Feel That Action Demonstrates
                </Card.Title>
                <TipCard Tip={<Step7Tips/>}/>    
              </Row>    

              <Row className='inputs'>
                <Form.Group>
                  <Form.Label>When people in my culture (or group) do the actions
                    I listed in Step 6, I say they are being:
                  </Form.Label>
                  <Form.Control
                    id='qualities'
                    name='qualities'
                    placeholder=
                      'ex: responsible, mature, trustworthy, calm'
                    type='text'
                    value={qualities}
                    onChange={handleChange}/>
                  <Form.Text>{formErrors.qualities}</Form.Text>
                </Form.Group>
              </Row>
            </Card>
 
            <h3>Reconnect beyond the culture bump</h3>
            <Card>
              <Row className='tip'>
                <Card.Title>
                  Step 8: Ask or think about how those qualities are
                  demonstrated by other people
                </Card.Title>
              </Row>    

              <Row className='inputs'>
                <Form.Group>
                  <Form.Label>
                    How does the other person(s) you had the culture bump with express
                    the qualities you listed in Step 7? (If you do not know, consider
                    starting a conversation with a question like, "How do you like to show
                    (a quality from Step 7))?"
                  </Form.Label>
                  <Form.Control
                    id='connectionPoint'
                    name='connectionPoint'
                    placeholder=
                      {`ex: I never thought about that. I have seen them complete their part
                      of work projects always on time. Maybe that's how they like showing
                      trustworthiness. This might be a interesting conversation to have during
                      break time next week`}
                    type='text'
                    value={connectionPoint}
                    onChange={handleChange}/>
                  <Form.Text>{formErrors.connectionPoint}</Form.Text>
                </Form.Group>
              </Row>
            </Card>

            <Button onClick={handleSubmit}>Save</Button>
          </Form>
        </Row>
      </Container>

    </div>
    
  )
}

export default StepsAddForm