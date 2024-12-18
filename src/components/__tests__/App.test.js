import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "../../App"
import * as helpers from "../../services/helpers"

jest.mock("../../services/helpers")

describe("App Component", () => {
  it("redirects to / when not authenticated", () => {
    helpers.isAuthenticated.mockReturnValue(false)

    render(
      <MemoryRouter initialEntries={["/files"]}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument()
  })

  it("renders files page when authenticated", () => {
    helpers.isAuthenticated.mockReturnValue(true)

    render(
      <MemoryRouter initialEntries={["/files"]}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getByText(/Files/i)).toBeInTheDocument()
  })
})
