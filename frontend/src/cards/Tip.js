import React, {useState} from 'react'

const Tips = ({Tip}) => {
  const [isDisplayed, setIsDisplayed] = useState(false)

  const toggle = (event) => {
    event.preventDefault()
    isDisplayed ? setIsDisplayed(false) : setIsDisplayed(true)
  }

  return (
    <div>
      <button onClick={toggle}>Tips</button>
      {isDisplayed && isDisplayed ? Tip : null}
    </div>
  )
}

export default Tips