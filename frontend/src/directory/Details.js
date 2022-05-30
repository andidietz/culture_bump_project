import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReferencePoint from '../cards/ReferencePoint'
import CultureBumpApi from '../api/api'
import Loading from '../components/Loading'

const DirectoryDetails = () => {
  const {id} = useParams()
  const [referencePoint, setReferencePoint] = useState({})

  useEffect(function loadDetails() {
    async function getDetails() {
      const referencePoint = await CultureBumpApi.getSpecificReferencePointInfoById(id)
      setReferencePoint(referencePoint)
    }
    getDetails()
  }, [])

  const {
    universal, 
    action, 
    headersituation, 
    headerspecification, 
    tag,
    qualities, 
    user_id
  } = referencePoint

  if (!referencePoint) return <Loading/>
  
  return (
    <div>
      <ReferencePoint 
        universal={universal}
        action={action}
        headerSituation={headersituation}
        headerSpecification={headerspecification}
        tag={tag}
        qualities={qualities} 
        userId={user_id}
      />
    </div>
  )
}

export default DirectoryDetails