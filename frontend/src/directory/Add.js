import React, {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'
import Loading from '../components/Loading'
import "react-widgets/styles.css"
import {Combobox, DropdownList} from "react-widgets"
import { Container, Form, Row, Col, Card, Button} from 'react-bootstrap'


const DirectoryAdd = () => {
  const history = useHistory()
  const {id} = useParams()

  const {currentUser}  = useContext(UserContext)
  const username = currentUser.username
  const [isHidden, setIsHidden] = useState(false)
  const [titleComponents, setTitleComponents] = useState(null)
  const [referencePoint, setReferencePoint] = useState({})

  const [headerValues, setHeaderValues] = useState({
    headerSituation: [],
    headerSpecification: [],
    categories: [],
    subcategories: [],
    userTags: []
  })

  const [formData, setFormData] = useState({
    headerSituationAdverb: '',
    headerSituation: {},
    headerSpecification: {},
    category: {},
    subcategory: {},
    tag: {}
  })


  useEffect(function loadPageInfo() {
    async function getPageInfo() {

      const referencePoint = await CultureBumpApi.getBasicReferencePointInfoById(id)
      const headerValues = await CultureBumpApi.getHeaderValues(username)

      setReferencePoint(referencePoint)
      setHeaderValues(headerValues)

      if (headerValues.userTags && headerValues.userTags.length === 0) {
        alert("Looks like you haven't added any Shared Reference Group Tags to your profile. Please edit your profile and add at least one tag in order to add your reference point to the directory")
        history.push(`/users/${username}`)
      }
    }
    getPageInfo()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()
    let formatedHeaderSituation;

    if (formData.headerSituationAdverb) {
      formatedHeaderSituation = `${formData.headerSituationAdverb} ${formData.headerSituation}`
    } else {
      formatedHeaderSituation = formData.headerSituation
    }

    const data = {
      header_situation_id: formatedHeaderSituation,
      header_specification_id: formData.headerSpecification, 
      header_tag_id: formData.tag, 
      category_id: formData.category,
      subcategory_id: formData.subcategory 
    } 

    await CultureBumpApi.addToDirectory(id, data)
    history.push(`/directory`)
  }

  const formatTitle = (event) => {
    event.preventDefault()
    let headerSituation;
    let headerSpecification;
    let tag;
    
    if (typeof formData.headerSituation === 'string') {
      headerSituation = `${formData.headerSituationAdverb} ${formData.headerSituation}`
    } else { 
      headerSituation = formData.headerSituation.header_situation
    }

    if (typeof formData.headerSpecification === 'string') {
      headerSpecification = formData.headerSpecification
    } else { 
      headerSpecification = formData.headerSpecification.header_specification
    }

    if (typeof formData.tag === 'string') {
      tag = formData.tag
    } else { 
      tag = formData.tag.tag
    }

    if (headerSituation && headerSpecification && tag) {
      let title = (
        <div>
          <p>
            Does the title below sound right? 
            To change your title, edit your above answers and hit the formate title button again.
          </p>
          <p>{headerSituation} {headerSpecification} in {tag}</p>
        </div>
      )
      setTitleComponents(title)
    }
  }

  function checkIfEmpty(value) {  
    typeof value === 'string' ? setIsHidden(false) : setIsHidden(true)
  }

  function hideInput(event) {
    isHidden ? setIsHidden(false) : setIsHidden(true)
    setFormData(formData => ({
      ...formData,
      headerSituationAdverb: ''
    }))
  }

  if (!referencePoint) return <Loading/>

  const {
    universal,
    action,
    qualities
  } = referencePoint
  
  return (
    <div>
      <Container>
        <Row>
          <Card>
            <Card.Title>Add To Directory</Card.Title>
            <Card.Body>{universal && universal}</Card.Body>
            <Card.Body>{action && action}</Card.Body>
            <Card.Body>{qualities && qualities}</Card.Body>
          </Card>
          <Form onSubmit={handleSubmit}>
            <h2>Format The Title</h2>
            <Form.Group>

              <Form.Label>What is the situation?</Form.Label>
              <Col>
                {!isHidden ? 
                  <select 
                    name="headerSituationAdverb" 
                    id="headerSituationAdverb" 
                    placeholder='When'
                    onChange={(event) => {
                      const {name, value} = event.target

                      setFormData(formData => ({
                          ...formData,
                          [name]: value
                      }))}}
                  >
                    <option value='' disabled selected>Choose option</option>
                    <option value="When">When</option>
                    <option value="How">How</option>
                    <option value="What">What</option>
                    <option value="Where">Where</option>
                  </select> : null
                }
              </Col>
              <Col>
                <Combobox 
                  data={headerValues.headerSituation}
                  dataKey='id'
                  textField='header_situation'
                  placeholder='I arrive late'
                  filter='contains'
                  hideEmptyPopup 
                  autoSelectMatches
                  onChange={(param) => {
                    checkIfEmpty(param)
                    setFormData(formData => ({
                        ...formData,
                        headerSituation: param
                    }))
                  }}
                  onSelect={(param) => hideInput(param)}
                />
              </Col>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Do you do this in a specific location, with specific people, 
                or in a specific situation? (Such as at work, to people in authority, 
                during a holiday)
              </Form.Label>
              <Combobox 
                data={headerValues.headerSpecification}
                dataKey='id'
                textField='header_specification'
                placeholder='to class'
                hideEmptyPopup
                autoSelectMatches
                filter='contains' 
                onChange={(param) => {
                  setFormData(formData => ({
                      ...formData,
                      headerSpecification: param
                  }))
                }}
              />
            </Form.Group>

            <Form.Group>
            <Form.Label>
                Is this an action typically shared by one of your reference group?
                 If so, which one?
              </Form.Label>
              <Form.Label>In</Form.Label>
            <DropdownList
              data={headerValues.userTags}
              dataKey='id'
              textField='tag'
              placeholder='United States'
              onChange={(param) => {
                setFormData(formData => ({
                    ...formData,
                    tag: param
                }))
              }}
            />
            </Form.Group>
            
            {titleComponents ? titleComponents : <p>please fill out all of the above questions</p>}
            <Button onClick={formatTitle}>Format Title</Button>
          
            <h2>Pick The Categories</h2>
            <Form.Group>
              <Form.Label>
                Pick a good category for your  new reference point 
                so others can find it
              </Form.Label>
              <Combobox 
                data={headerValues.categories}
                dataKey='id'
                textField='category'
                placeholder='In School'
                hideEmptyPopup
                autoSelectMatches
                filter='contains' 
                onChange={(param) => {
                  setFormData(formData => ({
                      ...formData,
                      category: param
                  }))
                }}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Does it fit in a good subcategory? 
              </Form.Label>
              <Combobox 
                data={headerValues.subcategories}
                dataKey='id'
                textField='subcategory'
                placeholder='classroom etiquette'
                hideEmptyPopup
                autoSelectMatches
                filter='contains' 
                onChange={(param) => {
                  setFormData(formData => ({
                      ...formData,
                      subcategory: param
                  }))
                }}
              />
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
        </Row>
      </Container>
    </div>
  )
}

export default DirectoryAdd