import React, {useState, useEffect} from 'react'
import Category from './Category.js'
import CultureBumpApi from '../api/api.js'
import Loading from '../components/Loading'

const DirectoryList = () => {
  const [categories, setCategories] = useState([])

  useEffect(function loadCategories() {
    async function getCategories() {
      const categories = await CultureBumpApi.getCategories()
      setCategories(categories)
    }
    getCategories()
  }, [])

  if (!categories) return <Loading/>

  return (
    <div>
      {categories && categories.map(
        ({category, id}) => <Category category={category} id={id}/>)
      }
    </div>
  )
}

export default DirectoryList  