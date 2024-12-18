import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import UploadFile from "../UploadFile"
import * as api from "../../services/api"

jest.mock("../../services/api")

describe("UploadFile Component", () => {
  it("renders upload input and button", () => {
    render(<UploadFile />)

    expect(screen.getByText(/Upload/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Upload/i })).toBeInTheDocument()
  })

  it("handles file selection and upload", async () => {
    api.uploadFile = jest.fn()

    render(<UploadFile />)

    const file = new File(["dummy content"], "test-file.txt", {
      type: "text/plain",
    })
    const input = screen.getByRole("textbox")
    const button = screen.getByRole("button", { name: /Upload/i })

    fireEvent.change(input, { target: { files: [file] } })
    fireEvent.click(button)

    expect(api.uploadFile).toHaveBeenCalledWith(file)
  })

  it("shows alert when no file is selected", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {})

    render(<UploadFile />)

    const button = screen.getByRole("button", { name: /Upload/i })
    fireEvent.click(button)

    expect(window.alert).toHaveBeenCalledWith("Please select a file to upload.")
  })
})
