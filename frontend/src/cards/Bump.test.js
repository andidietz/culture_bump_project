import React from "react"
import { render } from "@testing-library/react"
import Bump from "./Bump"

it("renders without crashing", function() {
  const referencePoint = {
    type: 'test', 
    sparker: 'test', 
    thought: 'test',
    observation: 'test',
    response: 'test',
    emotions: 'test',
    universal: 'test',
    action: 'test',
    qualities: 'test',
    connection_point: 'test'}
  render(<Bump referencePoint={referencePoint}/>)
})

it("matches snapshot", function() {
  const referencePoint = {
    type: 'test', 
    sparker: 'test', 
    thought: 'test',
    observation: 'test',
    response: 'test',
    emotions: 'test',
    universal: 'test',
    action: 'test',
    qualities: 'test',
    connection_point: 'test'}

  const { asFragment } = render(<Bump referencePoint={referencePoint}/>)
  expect(asFragment()).toMatchSnapshot()
})