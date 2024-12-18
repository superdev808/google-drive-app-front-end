import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import FileList from "../FileList"
import * as api from "../../services/api"

jest.mock("../../services/api")

describe("FileList Component", () => {
  it("displays loading state", () => {
    render(
      <BrowserRouter>
        <FileList />
      </BrowserRouter>
    )

    expect(screen.getByText(/Loading files.../i)).toBeInTheDocument()
  })

  it("renders files when API call is successful", async () => {
    api.fetchFiles.mockResolvedValue([
      { id: "1", name: "File 1", modifiedTime: "2023-12-16T10:00:00Z" },
    ])

    render(
      <BrowserRouter>
        <FileList />
      </BrowserRouter>
    )

    await waitFor(() => expect(api.fetchFiles).toHaveBeenCalled())

    expect(screen.getByText(/File 1/i)).toBeInTheDocument()
    expect(screen.getByText(/2023-12-16 10:00/i)).toBeInTheDocument()
  })

  it("displays error message when API call fails", async () => {
    api.fetchFiles.mockRejectedValue(new Error("Failed to fetch files"))

    render(
      <BrowserRouter>
        <FileList />
      </BrowserRouter>
    )

    await waitFor(() => expect(api.fetchFiles).toHaveBeenCalled())

    expect(screen.getByText(/Failed to fetch files/i)).toBeInTheDocument()
  })

  it("handles download file action", async () => {
    api.fetchFiles.mockResolvedValue([
      { id: "1", name: "File 1", modifiedTime: "2023-12-16T10:00:00Z" },
    ])
    api.downloadFile = jest.fn()

    render(
      <BrowserRouter>
        <FileList />
      </BrowserRouter>
    )

    await waitFor(() => expect(api.fetchFiles).toHaveBeenCalled())

    const downloadButton = screen.getByText(/Download/i)
    fireEvent.click(downloadButton)

    expect(api.downloadFile).toHaveBeenCalledWith("1")
  })

  it("handles delete file action", async () => {
    api.fetchFiles.mockResolvedValue([
      { id: "1", name: "File 1", modifiedTime: "2023-12-16T10:00:00Z" },
    ])
    api.deleteFile = jest.fn()

    render(
      <BrowserRouter>
        <FileList />
      </BrowserRouter>
    )

    await waitFor(() => expect(api.fetchFiles).toHaveBeenCalled())

    const deleteButton = screen.getByText(/Delete/i)
    fireEvent.click(deleteButton)

    expect(api.deleteFile).toHaveBeenCalledWith("1")
  })
})
