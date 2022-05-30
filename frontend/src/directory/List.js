import React, {useState, useEffect} from 'react'
import Category from './Category.js'
import CultureBumpApi from '../api/api.js'
import Loading from '../components/Loading'
import {Container, Card, Row} from 'react-bootstrap'
import './List.css'


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
      <Container fluid>
        <Row className="justify-content-center">

          <h1 className='header'>Culture Bump Directory</h1>
          {categories && categories.map(
            ({category, id}) => <Category category={category} id={id}/>)
          }

        </Row>
      </Container>


      {/* {categories && categories.map(
        ({category, id}) => <Category category={category} id={id}/>)
      } */}
    </div>
  )
}

export default DirectoryList  