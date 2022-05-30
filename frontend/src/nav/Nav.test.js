import React from "react"
import { render } from "@testing-library/react"
import Nav from "./Nav"
import { UserProvider } from "../testUtils"
import {MemoryRouter} from 'react-router'

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <Nav/>
      </UserProvider>
    </MemoryRouter>
  )
})

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Nav/>
      </UserProvider>
    </MemoryRouter>
  )
  expect(asFragment()).toMatchSnapshot()
})