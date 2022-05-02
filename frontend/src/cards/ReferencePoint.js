import React, { useContext } from 'react'
import RefContext from '../context/RefContext'

const ReferencePoint = () => {
  const {
    headerSituation, 
    headerSpecification, 
    tag, 
    action,
    qualities
  } = useContext(RefContext)
  
  return (
    <div>
      <div>
        <h2>Situation</h2>
        <p>{headerSituation}</p>

        <h2>Specific Location or Detail</h2>
        <p>{headerSpecification}</p>

        <h2>General Shared Reference Group</h2>
        <p>{tag}</p>

        <h2>I would ...</h2>
        <p>{action}</p>

        <h2>When I do this I am being...</h2>
        <p>{qualities}</p>

        <h2>How do you express these qualities in your life?</h2>
      </div>
    </div>
  )
}

export default ReferencePoint