import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchFiles, downloadFile, deleteFile } from "../services/api"

const FileList = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const navigate = useNavigate()

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const fileList = await fetchFiles()
        setFiles(fileList)
      } catch (err) {
        setError(err.message) // Set error message
      } finally {
        setLoading(false) // Stop loading regardless of success or failure
      }
    }
    loadFiles()
  }, [])

  const handleDownload = async (fileId, fileName) => {
    setError("")
    try {
      await downloadFile(fileId, fileName)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (fileId) => {
    setError("")
    try {
      await deleteFile(fileId)
      setFiles(files.filter((file) => file.id !== fileId))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h2>Files</h2>
      <button
        onClick={() => navigate("/upload")}
        style={{ marginBottom: "20px" }}
      >
        Go to Uploads
      </button>
      {/* Display error messages */}
      <p style={{ color: "red", height: 30 }}>{error}</p>
      {loading ? (
        <p>Loading files...</p> // Display loading text while fetching files
      ) : (
        <table
          border="1"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map((file) => (
                <tr key={file.id}>
                  <td>{file.name}</td>
                  <td>{new Date(file.modifiedTime).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleDownload(file.id)}>
                      Download
                    </button>
                    <button onClick={() => handleDelete(file.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No files found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default FileList
