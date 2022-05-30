import React from "react"
import { render } from "@testing-library/react"
import Tip from "./Tip"
import Step1Tips from '../components/StepTips'

it("renders without crashing", function() {
  render(<Tip tip={<Step1Tips/>} />)
})

it("matches snapshot", function() {
  const { asFragment } = render(<Tip tip={<Step1Tips/>} />)
  expect(asFragment()).toMatchSnapshot()
})