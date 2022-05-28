import React from 'react'
import {Link} from 'react-router-dom'

const Universal = ({tag, headerSpecification, headerSituation, id}) => {

  return (
    <div>
      <Link to={`directory/${id}`}>{headerSituation} {headerSpecification} in {tag}</Link>
    </div>
  )
}

export default Universal