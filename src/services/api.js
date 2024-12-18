import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const authenticate = async () => {
  window.location.href = `${API_BASE_URL}/auth`
}

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token")
  if (!refreshToken) throw new Error("No refresh token available")

  const response = await axios.post(`${API_BASE_URL}/refresh`, {
    refresh_token: refreshToken,
  })
  const { access_token } = response.data

  localStorage.setItem("access_token", access_token)
  return access_token
}

const getAuthHeader = async () => {
  let token = localStorage.getItem("access_token")
  if (!token) {
    token = await refreshToken()
  }
  console.log(token)
  return { Authorization: `Bearer ${token}` }
}

export const fetchFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/files`, {
      headers: await getAuthHeader(),
    })
    return response.data
  } catch (error) {
    console.error(
      "Error fetching files:",
      error.response?.data || error.message
    )
    throw new Error(error.response?.data?.error || "Failed to fetch files")
  }
}

export const uploadFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
      headers: {
        ...(await getAuthHeader()),
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  } catch (error) {
    console.error(
      "Error uploading file:",
      error.response?.data || error.message
    )
    throw new Error(error.response?.data?.error || "Failed to upload file")
  }
}

export const downloadFile = async (fileId, fileName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/download/${fileId}`, {
      headers: await getAuthHeader(),
      responseType: "blob",
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", fileName ?? "downloaded-file") // Set original file name
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error(
      "Error downloading file:",
      error.response?.data || error.message
    )
    throw new Error(
      error.response?.data?.error || "Failed to download the file."
    )
  }
}

export const deleteFile = async (fileId) => {
  try {
    await axios.delete(`${API_BASE_URL}/delete/${fileId}`, {
      headers: await getAuthHeader(),
    })
  } catch (error) {
    console.error("Error deleting file:", error.response?.data || error.message)
    throw new Error(error.response?.data?.error || "Failed to delete the file.")
  }
}
