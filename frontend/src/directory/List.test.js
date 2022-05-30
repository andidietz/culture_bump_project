import React from "react"
import { render } from "@testing-library/react"
import DirectoryList from "./List"

it("renders without crashing", function() {
  render(<DirectoryList />)
})

it("matches snapshot", function() {
  const { asFragment } = render(<DirectoryList />)
  expect(asFragment()).toMatchSnapshot()
})