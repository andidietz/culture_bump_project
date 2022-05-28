import React, {useState} from 'react'
import Universal from './Universal'
import CultureBumpApi from '../api/api'

const Subcategory = ({subcategory, categoryId, subcategoryId}) => {
  const [headers, setHeaders] = useState([])
  const [isDisplayed, setIsDisplayed] = useState(false)

  const getHeaders = async () => {
    const headers = await CultureBumpApi.getHeaders(categoryId, subcategoryId)
    setHeaders(headers)
    isDisplayed ? setIsDisplayed(false) : setIsDisplayed(true)
  }

  return (
    <div>
      <p onClick={getHeaders}>{subcategory}</p>
      {isDisplayed && headers && 
        headers.map(({tag, headerspecification, headersituation, id}) => 
          <Universal 
            headerSpecification={headerspecification} 
            tag={tag} 
            headerSituation={headersituation} 
            id={id}/>)
      }
    </div>
  )
}

export default Subcategory