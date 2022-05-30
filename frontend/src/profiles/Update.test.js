import React from "react"
import { render } from "@testing-library/react"
import ProfileUpdate from "./Update"
import { UserProvider } from "../testUtils"

it("renders without crashing", function() {
  render(
    <UserProvider>
      <Profile />
    </UserProvider>
  )
})

it("matches snapshot", function() {
  const { asFragment } = render(
    <UserProvider>
      <ProfileUpdate />
    </UserProvider>
  )
  expect(asFragment()).toMatchSnapshot()
})
