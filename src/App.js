import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Auth from "./components/Auth"
import FileList from "./components/FileList"
import UploadFile from "./components/UploadFile"
import "./App.css"
import { isAuthenticated } from "./services/helpers"

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <FileList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadFile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
