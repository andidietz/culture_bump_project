import React, {useEffect, useState} from 'react'
import Subcategory from './Subcategory.js'
import CultureBumpApi from '../api/api.js'
import {Accordion} from 'react-bootstrap'


const Category = ({category, id}) => {
  const [subcategories, setSubcategories] = useState(null)
  const [isDisplayed, setIsDisplayed] = useState(false)

  useEffect(function checkSubcategories() {
    async function getAllSubcategories() {
      const subcategories = await CultureBumpApi.getSubcategories(id)
      setSubcategories(subcategories)
    }
    getAllSubcategories()
  }, [])

  const displaySubcategories = async () => {
    isDisplayed ? setIsDisplayed(false) : setIsDisplayed(true)
  }

  const accordionComponents = (
    <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={displaySubcategories}>{category}</Accordion.Header>
        <Accordion.Body>
          {subcategories && subcategories.map(({
            subcategory, 
            categoryid: categoryId, 
            subcategoryid: subcategoryId
            }) => <Subcategory 
                    subcategory={subcategory} 
                    subcategoryId={subcategoryId} 
                    categoryId={categoryId}/>)
          }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )

  return (
    <div>
      {subcategories && subcategories.length !== 0 ? accordionComponents : null}
    </div>
  )
}

export default Category