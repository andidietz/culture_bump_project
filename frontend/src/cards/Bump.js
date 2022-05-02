import React, { useContext } from 'react'
import RefContext from '../context/RefContext'


const Bump = (
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
) => {

  return (
    <div>
      <h2><span>Detach</span> from the culture bump</h2>
      <h3><span>Step 1</span> 
        Pinpoint The Culture Bump
      </h3>
      <p>I had a {type} culture bump with {spark} and I thought it was {thought}.</p>
      
      <h3><span>Step 2</span> 
        Describe What The Other Person(s) Did
      </h3>
      <p>{obvervation}</p>

      <h3><span>Step 3</span> 
        Describe What You Did
      </h3>
      <p>{response}</p>

      <h3><span>Step 4</span> 
        List The Emotions You Felt When The Bump Happened
      </h3>
      <p>{emotions}</p>

      <h2><span>Discover</span> our commonalities</h2>
      <h3><span>Step 5</span> 
        Find The Universal Situation In The Incident When It Happened
      </h3>
      <p>{universal}</p>

      <h3><span>Step 6</span> 
        List And Describe Specific Actions You Would Do In The Universal 
        Situation From Step 5
      </h3>
      <p>{action}</p>

      <h3><span>Step 7</span> 
        List The Qualities That You Feel That Action Demonstrates
      </h3>
      <p>{qualities}</p>

      <h2><span>Reconnect</span> beyond the culture bump</h2>
      <h3><span>Step 8</span> 
        Ask or think about how those qualities are demonstrated by other people
      </h3>
      <p>{connectionPoint}</p>
    </div>
  )
}

export default Bump