import React from "react"
import { render } from "@testing-library/react"
import StepsAddForm from "./Add"

it("renders without crashing", function() {
  render(<StepsAddForm />)
})

it("matches snapshot", function() {
  const { asFragment } = render(<StepsAddForm />)
  expect(asFragment()).toMatchSnapshot()
})
