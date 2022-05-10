import React from 'react'
import {useHistory} from 'react-router-dom'

const DirectoryAdd = ({formData, handleChange, resetFormData}) => {
  const history = useHistory()
  let titleComponents;

  const handleSumbit = event => {
    event.preventDefault()
    resetFormData()
    history.push(`/directory`)
  } 

  const {
    headerSituation,
    headerSpecification,
    tag,
    category,
    subcategory
  } = formData

  // const provideTitle = () => {
  //   isTitleProvided = true
  // }

  const formatTitle = (event) => {
    // Check to see if all three have values, tell them to complete all 3 if not done
    const headerSituation = event.target.headerSituation.value
    const headerSpecification = event.target.headerSpecification.value
    const tag = event.target.tag.value

    if (headerSituation && headerSpecification && tag) {
      titleComponents = (
        <div>
          <p>
            Does the Title below sound right? 
            Edit the grammar your answers above if needed
          </p>
          <p>{headerSituation} {headerSpecification} {tag}</p>
        </div>
      )
      
      return titleComponents
    }
  }

  return (
    <div>
      <h1>Add To Directory</h1>
      <p>Instructions</p>

      <form>
        <h2>Format The Title</h2>
        <p>What is the situation?</p>
        <label>When </label>
        <input 
          id='headerSituation'
          name='headerSituation'
          placeholder='I arrive late'
          type='text'
          value={headerSituation}
          onChange={handleChange}/>
        <p>
          Do you do this in a specific location, with specific people, 
          or in a specific situation? (Such as at work, to people in authority, 
          during a holiday)
        </p>
        <input 
          id='headerSpecification'
          name='headerSpecification'
          placeholder='to class'
          type='text'
          value={headerSpecification}
          onChange={handleChange}/>
        <input />
        <p>
          Is this an action typically shared by one of your reference group?
          If so, which one?
        </p>
        <label>in </label>
        <input 
          id='tag'
          name='tag'
          placeholder='in Japan'
          type='text'
          value={tag}
          onChange={handleChange}/>
        <input />
        <button onClick={formatTitle}>Format Title</button>
        {titleComponents ? titleComponents : <p>please fill out all of the above questions</p>}
        <p>{headerSituation} {headerSpecification} {tag}</p>
        <h2>Pick The Categories</h2>
        <label>
          Pick a good category for your  new reference point 
          so others can find it
        </label>
        <input 
          id='category'
          name='category'
          placeholder='category'
          type='text'
          value={category}
          onChange={handleChange}/>
        <label>
          Does it fit in a good subcategory? 
          <span>Example:
            Category: school
            Subcategory: interactions with a teacher or classroom etiquette
          </span>
        </label>
        <input 
          id='subcategory'
          name='subcategory'
          placeholder='subcategory'
          type='text'
          value={subcategory}
          onChange={handleChange}/>
        <button onSubmit={handleSumbit}>Submit</button>
      </form>
      
    </div>

  )
}

export default DirectoryAdd