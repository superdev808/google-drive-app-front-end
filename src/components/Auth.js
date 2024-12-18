import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { authenticate } from "../services/api"

const Auth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("AAA")
    const params = new URLSearchParams(window.location.search)
    const accessToken = params.get("access_token")
    const refreshToken = params.get("refresh_token")

    if (accessToken && refreshToken) {
      // Store tokens in localStorage
      localStorage.setItem("access_token", accessToken)
      localStorage.setItem("refresh_token", refreshToken)

      // Navigate to the dashboard
      navigate("/files")
    }
  }, [navigate])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Google Drive Integration</h1>
      <button onClick={authenticate}>Login with Google</button>
    </div>
  )
}

export default Auth
