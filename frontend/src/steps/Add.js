import React, {useContext} from 'react'
import UserContext from '../context/UserConext'
import {useHistory} from 'react-router-dom'
 import {
  step1Tips,
  step2Tips,
  step3Tips,
  step4Tips,
  step5Tips,
  step6Tips,
  step7Tips
} from '../components/StepTips'

const StepsAddForm = ({formData, handleChange, resetFormData}) => {
 const history = useHistory()
 const {username} = useContext(UserContext)

  const handleSumbit = event => {
    event.preventDefault()
    resetFormData()
    history.push(`/users/${username}`)
  }

  const {  
    type, 
    spark, 
    thought,
    obvervation,
    response,
    emotions,
    universal,
    action,
    qualities,
    connectionPoint
  } = formData

  return (
    <form onSubmit={handleSumbit}>
      <h1>8 Step Tool</h1>
      <h2><span>Detach</span> from the culture bump</h2>

      <h2><span>Step 1</span> Pinpoint The Culture Bump</h2>
      {step1Tips}
      <button>Tips</button>
      <label>I had a</label>
      <input 
        id='type'
        name='type'
        placeholder='ex: positive'
        type='text'
        value={type}
        onChange={handleChange}
      />
      <label>culture bump with</label>
      <input 
        id='spark'
        name='spark'
        placeholder='ex: person(s) or object(s)'
        type='text'
        value={spark}
        onChange={handleChange}
      />
      <label>and I thought that was</label>
      <input 
        id='thought'
        name='thought'
        placeholder='ex: surprising, rude, cute, etc.'
        type='text'
        value={thought}
        onChange={handleChange}
      />

      <h2><span>Step 2</span> Describe What The Other Person(s) Did</h2>
      {step2Tips}
      <button>Tips</button>
      <label>
        What did the other person(s) do or say? 
        Or, in case of an object, describe it physically.
      </label>
      <input 
        id='observation'
        name='observation'
        placeholder=
          {'ex: they looked at the sign that said "No Entrance" and walked into the door'}
        type='text'
        value={obvervation}
        onChange={handleChange}
      />
 
 <    h2><span>Step 3</span> Describe What You Did</h2>
      {step3Tips}
      <button>Tips</button>
      <label>What did I do or say?</label>
      <input 
        id='response'
        name='response'
        placeholder=
          'ex: I looked at them, sighed, and remained sitting'
        type='text'
        value={response}
        onChange={handleChange}
      />

      <h2><span>Step 4</span> List The Emotions You Felt When The Bump Happened</h2>
      {step4Tips}
      <button>Tips</button>
      <label>At the time of the culture bump, the emotions I felt were:</label>
      <input 
        id='emotions'
        name='emotions'
        placeholder=
          'ex: surprised, nervous, disappointed, out of place'
        type='text'
        value={emotions}
        onChange={handleChange}
      />

      <h2><span>Discover</span> our commonalities</h2>
      <h2><span>Step 5</span> Find The Universal Situation In 
        The Incident When It Happened
      </h2>
      {step5Tips}
      <button>Tips</button>
      <label>
        Now let's find a universal situation for your culture bump. 
        It will be something that could happen to anyone from anywhere, 
        like arriving late or feeling hungry in class or a meeting. 

        Find the universal situation in this incident. 
        (What is the situation that they were responding to?)
      </label>
      <input 
        id='universal'
        name='universal'
        placeholder=
          'ex: Wanting to ignore a rule'
        type='text'
        value={universal}
        onChange={handleChange}
      />

      <h2><span>Step 6</span> List And Describe Specific Actions You 
        Would Do In The Universal Situation From Step 5
      </h2>
      {step6Tips}
      <button>Tips</button>
      <label>
        List and describe specific actions you would do in the 
        universal situation from Step 5.
      </label>
      <input 
        id='action'
        name='action'
        placeholder=
         {`ex: I would complain to my friends and I would find out the 
          reasons behind the rule, but in the end, I would still follow 
          the rule anyways`}
        type='text'
        value={action}
        onChange={handleChange}
      />

      <h2><span>Step 7</span> List The Qualities That You Feel That Action Demonstrates
      </h2>
      {step7Tips}
      <button>Tips</button>
      <label>
        When people in my culture (or group) do the actions 
        I listed in Step 6, I say they are being:
      </label>
      <input 
        id='qualities'
        name='qualities'
        placeholder=
          'ex: responsible, mature, trustworthy, calm'
        type='text'
        value={qualities}
        onChange={handleChange}
      />

      <h2><span>Reconnect</span> beyond the culture bump</h2>
      <h2>
        <span>Step 8</span> Ask or think about how those qualities are 
        demonstrated by other people
      </h2>
      <button>Tips</button>
      <label>
        How does the other person(s) you had the culture bump with express 
        the qualities you listed in Step 7? (If you do not know, consider 
        starting a conversation with a question like, "How do you like to show 
        (a quality from Step 7)?"
      </label>
      <input 
        id='connectionPoint'
        name='connectionPoint'
        placeholder=
          {`ex: I never thought about that. I have seen them complete their part 
          of work projects always on time. Maybe that's how they like showing 
          trustworthiness. This might be a interesting conversation to have during 
          break time next week`}
        type='text'
        value={connectionPoint}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>





  

    

    
  )
}

export default StepsAddForm