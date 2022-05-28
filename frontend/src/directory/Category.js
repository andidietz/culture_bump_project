import React, {useState} from 'react'
import Subcategory from './Subcategory.js'
import CultureBumpApi from '../api/api.js'

const Category = ({category, id}) => {
  const [subcategories, setSubcategories] = useState(null)
  const [isDisplayed, setIsDisplayed] = useState(false)

  const getSubcategories = async () => {
    const subcategories = await CultureBumpApi.getSubcategories(id)
    setSubcategories(subcategories)
    isDisplayed ? setIsDisplayed(false) : setIsDisplayed(true)
  }

  return (
    <div>
      <p onClick={getSubcategories}>{category}</p>
      {isDisplayed && subcategories && subcategories.map(({subcategory, categoryid: categoryId, subcategoryid: subcategoryId}) => <Subcategory subcategory={subcategory} subcategoryId={subcategoryId} categoryId={categoryId}/>)}
    </div>
  )
}

export default Category