import React from "react"
import { render } from "@testing-library/react"
import ReferencePoint from "./ReferencePoint"

it("renders without crashing", function() {
  render(
    <ReferencePoint 
      universal='tests'
      action='tests'
      headerSituation='tests'
      headerSpecification='tests'
      tag='tests'
      qualities='tests'
      userId='testUser'
   />
  )
})

it("matches snapshot", function() {
  const { asFragment } = render(
    <ReferencePoint 
      universal='tests'
      action='tests'
      headerSituation='tests'
      headerSpecification='tests'
      tag='tests'
      qualities='tests'
      userId='testUser'
    />)
  expect(asFragment()).toMatchSnapshot()
})