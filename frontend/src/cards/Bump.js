import React from 'react'

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


  // console.log('Bump Card', type, 
  // sparker, 
  // thought,
  // observation,
  // response,
  // emotions,
  // universal,
  // action,
  // qualities,
  // connection_point)
  const connectionPoint = connection_point

  return (
    <div>
      <h2><span>Detach</span> from the culture bump</h2>
      <p><span>Step 1</span> 
        Pinpoint The Culture Bump
      </p>
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
      <p>{connectionPoint}</p>
    </div>
  )
}

export default Bump