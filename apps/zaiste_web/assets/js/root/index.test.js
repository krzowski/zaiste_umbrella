import React from "react"
import { render } from "@testing-library/react"
import Root from "./index"

describe("Root", () => {
  it("should show Sign in page for unauthenticated user", () => {
    const { getByText } = render(<Root />)
    expect(getByText("Sign in")).toBeInTheDocument()
  })
})
