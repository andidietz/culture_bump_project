import React from 'react'
import { Card } from 'react-bootstrap'

const Bump = ({referencePoint}) => {
  const {type, 
    sparker, 
    thought,
    observation,
    response,
    emotions,
    universal,
    action,
    qualities,
    connection_point} = referencePoint

  const connectionPoint = connection_point

  return (
    <div>
          <Card.Title>Detach from the culture bump</Card.Title>
          <Card.Subtitle>Step 1: Pinpoint The Culture Bump</Card.Subtitle>
          <Card.Text>
            I had a {type} culture bump with {sparker} and I thought it was {thought}.
          </Card.Text>

          <Card.Subtitle>Step 2: Describe What The Other Person(s) Did</Card.Subtitle>
          <Card.Text>
            {observation}
          </Card.Text>

          <Card.Subtitle>Step 3: Describe What You Did</Card.Subtitle>
          <Card.Text>
            {response}
          </Card.Text>

          <Card.Subtitle>Step 4: List The Emotions You Felt When The Bump Happened</Card.Subtitle>
          <Card.Text>
            {response}
          </Card.Text>

          <Card.Subtitle>Step 2: Describe What The Other Person(s) Did</Card.Subtitle>
          <Card.Text>
            {emotions}
          </Card.Text>

          <Card.Title>Discover our commonalities</Card.Title>
          <Card.Subtitle>
            Step 5: Find The Universal Situation In The Incident When It Happened
          </Card.Subtitle>
          <Card.Text>
            {universal}
          </Card.Text>

          <Card.Subtitle>
            Step 6: List And Describe Specific Actions You Would Do In The Universal 
            Situation From Step 5
        </Card.Subtitle>
          <Card.Text>
            {action}
          </Card.Text>

          <Card.Subtitle>
            Step 6: List And Describe Specific Actions You Would Do In The Universal 
            Situation From Step 5
        </Card.Subtitle>
          <Card.Text>
            {action}
          </Card.Text>

        <Card.Subtitle>
            Step 7: List The Qualities That You Feel That Action Demonstrates
        </Card.Subtitle>
          <Card.Text>
            {qualities}
          </Card.Text>

        <Card.Title>Reconnect beyond the culture bump</Card.Title>
        <Card.Subtitle>
          Step 8: Ask or think about how those qualities are demonstrated by other people
        </Card.Subtitle>
        <Card.Text>
          {connectionPoint}
        </Card.Text>


      {/* <h2><span>Detach</span> from the culture bump</h2>
      <h5><span>Step 1</span> 
        Pinpoint The Culture Bump
      </h5>
      <p>I had a {type} culture bump with {sparker} and I thought it was {thought}.</p>
      
      <p><span>Step 2</span> 
        Describe What The Other Person(s) Did
      </p>
      <p>{observation}</p>

      <p><span>Step 3</span> 
        Describe What You Did
      </p>
      <p>{response}</p>

      <p><span>Step 4</span> 
        List The Emotions You Felt When The Bump Happened
      </p>
      <p>{emotions}</p>

      <h2><span>Discover</span> our commonalities</h2>
      <p><span>Step 5</span> 
        Find The Universal Situation In The Incident When It Happened
      </p>
      <p>{universal}</p>

      <p><span>Step 6</span> 
        List And Describe Specific Actions You Would Do In The Universal 
        Situation From Step 5
      </p>
      <p>{action}</p>

      <p><span>Step 7</span> 
        List The Qualities That You Feel That Action Demonstrates
      </p>
      <p>{qualities}</p>

      <h2><span>Reconnect</span> beyond the culture bump</h2>
      <p><span>Step 8</span> 
        Ask or think about how those qualities are demonstrated by other people
      </p>
      <p>{connectionPoint}</p> */}
    </div>
  )
}

export default Bump