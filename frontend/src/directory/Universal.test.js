import React from "react"
import { render } from "@testing-library/react"
import Universal from "./Universal"

it("renders without crashing", function() {
  render(
    <Universal               
      headerSpecification='test'
      tag='test'
      headerSituation='test'
      id={1} 
    />
  )
})

it("matches snapshot", function() {
  const { asFragment } = render(
    <Universal               
      headerSpecification='test'
      tag='test'
      headerSituation='test'
      id={1} 
    />)
  expect(asFragment()).toMatchSnapshot()
})