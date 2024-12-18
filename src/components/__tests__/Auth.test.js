import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Auth from "../components/Auth"
import * as api from "../services/api"

jest.mock("../../services/api")

describe("Auth Component", () => {
  it("renders login button", () => {
    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    )

    const loginButton = screen.getByText(/Login with Google/i)
    expect(loginButton).toBeInTheDocument()
  })

  it("calls authenticate function when login button is clicked", () => {
    api.authenticate = jest.fn()

    render(
      <BrowserRouter>
        <Auth />
      </BrowserRouter>
    )

    const loginButton = screen.getByText(/Login with Google/i)
    fireEvent.click(loginButton)

    expect(api.authenticate).toHaveBeenCalled()
  })
})
