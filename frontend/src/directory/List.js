import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import CultureBumpApi from '../api/api'

import DirectoryDetails from './Details'

const DirectoryList = () => {
  const [directoryEntries, setDirectoryEntries] = useState(INITIAL_STATE)
  let directoryComponents = []

  // TODO:
    // If entry already in state, don't fetch (api) it again.
        // if (!state (does not) have property) {
        //     api call
        //     toggle()
        // } else {
        //     toggle()
        // }

  // State
  const INITIAL_STATE = {
    [catId]: {
      catTitle: '',
      isToggleOn: false,
      subCats: {
        [subCatId]: {
          subCatTitle: '',
          isToggleOn: false,
          universals: [
            {
              universalId: 0,
              universal: ''
            }
          ]}
      }
    }
  }

  // Get initial categories
  useEffect(function loadCategories() {
    async function getCategories() {
      const categories = await CultureBumpApi.getCategories()
      setDirectoryEntries(categories)
    }
    getCategories()
  }, [])
  
  // Build Components
  useEffect(function buildCatComponent() {
    let catId
    let subCatTitle;
    let subCatId;
    let universalVal;
    let universalId;

    for (const [key, cat] of Object.entries(directoryEntries)) {
      const catId = key
      const catTitle = cat.catTitle
      if ('subCats' in cat) {
        const subCats = cat.subCats

        for (const [key, subCat] of Object.entries(subCats)) {
          subCatId = key
          subCatTitle = subCat.subCatTitle
          const universals = subCat.universals
          
          for (const [key, universal] of Object.entries(universals)) {
            universalId = universal.universalId
            universalVal = universal   
          }
        }
      }

      directoryComponents.push(
        <div>
          <p 
            data-catId={catId} 
            onClick={toggle}>
              {catTitle}
          </p>
          <p 
            data-catId={catId} 
            data-subcatId={subcatId} 
            onClick={toggle}>
            {subcatTitle}
          </p>
          <Link to={`/directory/${universalId}`} key={universalId}>
                <DirectoryDetails>{universalVal}</DirectoryDetails>
          </Link>
        </div>
      )
  }}, [directoryEntries])


  const toggle = (event) => {
    let idType;

    if (event.target.attributes.subcatId) {
      idType = 'subcatId'
    } else {
      idType = 'catId'
    }

    const id = event.target.attributes.idType.value
    const newToggleStatus = directoryEntries[idType].isToggleOn ? true : false
    directoryEntries[idType].isToggleOn = newToggleStatus
  }

  return (
    <div>
      {directoryComponents}
    </div>
  )
}

export default DirectoryList