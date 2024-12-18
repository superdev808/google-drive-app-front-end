import React, { useState } from "react"
import { uploadFile } from "../services/api"

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile)
      alert("File uploaded successfully!")
    } else {
      alert("Please select a file to upload.")
    }
  }

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default UploadFile
