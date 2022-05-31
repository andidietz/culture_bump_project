import React, {useState} from 'react'
import { Button } from 'react-bootstrap'

const Tips = ({Tip}) => {
  const [isDisplayed, setIsDisplayed] = useState(false)

  const toggle = (event) => {
    event.preventDefault()
    isDisplayed ? setIsDisplayed(false) : setIsDisplayed(true)
  }

  return (
    <div>
      <Button variant="outline-secondary" onClick={toggle}>Tips</Button>
      {isDisplayed && isDisplayed ? Tip : null}
    </div>
  )
}

export default Tips