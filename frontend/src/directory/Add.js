import React, {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import UserContext from '../context/UserConext'
import CultureBumpApi from '../api/api'
import Loading from '../components/Loading'
import "react-widgets/styles.css"
import Combobox from "react-widgets/Combobox"


const DirectoryAdd = () => {
  const history = useHistory()
  const {id} = useParams()

  const {currentUser}  = useContext(UserContext)
  const username = currentUser.username
  const [isHidden, setIsHidden] = useState(false)
  const [titleComponents, setTitleComponents] = useState(null)
  const [referencePoint, setReferencePoint] = useState({})

  const [headerInfo, setHeaderValues] = useState({
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
    // Check to see if all three have values, tell them to complete all 3 if not done
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
      <h1>Add To Directory</h1>
      <p>{universal && universal}</p>
      <p>{action && action}</p>
      <p>{qualities && qualities}</p>
      <p>Instructions</p>

      <form onSubmit={handleSubmit}>
        <h2>Format The Title</h2>
        <p>What is the situation?</p>
        
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

        <Combobox 
          data={headerInfo.headerSituation}
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

        <p>
          Do you do this in a specific location, with specific people, 
          or in a specific situation? (Such as at work, to people in authority, 
          during a holiday)
        </p>
        <Combobox 
          data={headerInfo.headerSpecification}
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

        <p>
          Is this an action typically shared by one of your reference group?
          If so, which one?
        </p>
        <label>in </label>
        <Combobox 
          data={headerInfo.userTags}
          dataKey='id'
          textField='tag'
          placeholder='Japan'
          filter='contains'
          hideEmptyPopup 
          autoSelectMatches
          onChange={(param) => {
            setFormData(formData => ({
                ...formData,
                tag: param
            }))
          }}
        />

        <button onClick={formatTitle}>Format Title</button>
        {titleComponents ? titleComponents : <p>please fill out all of the above questions</p>}

        <h2>Pick The Categories</h2>
        <label>
          Pick a good category for your  new reference point 
          so others can find it
        </label>
        <Combobox 
          data={headerInfo.categories}
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

        <label>
          Does it fit in a good subcategory? 
          <span>Example:
            Category: school
            Subcategory: interactions with a teacher or classroom etiquette
          </span>
        </label>
        <Combobox 
          data={headerInfo.subcategories}
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

        <button type='submit' >Submit</button>
      </form>
    </div>
  )
}

export default DirectoryAdd