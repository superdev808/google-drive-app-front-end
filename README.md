# Frontend Documentation

This documentation provides an overview of the frontend application, which integrates with the backend for Google Drive file management. The frontend is built using **React** and interacts with the backend API for authentication and file operations.

## Table of Contents
1. [Setup and Installation](#setup-and-installation)
2. [Environment Variables](#environment-variables)
3. [Project Structure](#project-structure)
4. [Key Components](#key-components)
5. [API Integration](#api-integration)
6. [Routing](#routing)
7. [Error Handling](#error-handling)

---

## 1. Setup and Installation

### Prerequisites
- Node.js (v16+ recommended)
- Backend service running locally or deployed

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (see [Environment Variables](#environment-variables)).
4. Start the development server:
   ```bash
   npm start
   ```

---

## 2. Environment Variables

The frontend uses a `.env` file for configuration. Add the following variables to a `.env` file in the root directory:

| Variable Name     | Description                              |
|-------------------|------------------------------------------|
| `REACT_APP_API_URL` | URL of the backend API                  |

Example `.env` file:
```env
REACT_APP_API_URL=http://localhost:3001
```

---

## 3. Project Structure

```plaintext
src/
├── components/
│   ├── Auth.js          # Handles Google OAuth login
│   ├── FileList.js      # Displays the list of files
│   ├── UploadFile.js    # Uploads files to Google Drive
├── services/
│   ├── api.js           # API integration logic
│   ├── helper.js        # Utility functions (e.g., token management)
├── App.js               # Main application component
├── index.js             # Entry point
├── setupTests.js        # Test setup
```

---

## 4. Key Components

### **1. Auth.js**
- **Description**: Handles Google OAuth authentication by redirecting the user to the backend for login.
- **Key Logic**:
  - Calls `/auth` endpoint on the backend to start the OAuth flow.
  - Redirects back to the frontend with tokens in the URL after successful login.
- **Props**: None.

### **2. FileList.js**
- **Description**: Fetches and displays the list of files from Google Drive.
- **Features**:
  - Displays file details (name, type, last modified).
  - Allows downloading and deleting files.
  - Shows a loading state while fetching files.
  - Handles errors during API calls.
- **Props**: None.

### **3. UploadFile.js**
- **Description**: Handles file uploads to Google Drive.
- **Features**:
  - Provides a file input for selecting files.
  - Calls the `/upload` endpoint on the backend to upload files.
  - Displays success or error messages after upload.
- **Props**: None.

---

## 5. API Integration

All API calls are managed in the `services/api.js` file using **Axios**.

### **1. API Endpoints**
- `GET /files`: Fetches the list of files.
- `POST /upload`: Uploads a file to Google Drive.
- `GET /download/:fileId`: Downloads a file from Google Drive.
- `DELETE /delete/:fileId`: Deletes a file from Google Drive.

### **2. Example API Methods**
#### `fetchFiles`
Fetches the list of files from the backend:
```javascript
export const fetchFiles = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/files`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    });
    return response.data;
};
```

#### `uploadFile`
Uploads a file to the backend:
```javascript
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
```

---

## 6. Routing

The application uses **React Router** for navigation:

### Routes
| Path          | Component  | Description                    |
|---------------|------------|--------------------------------|
| `/`           | `Auth.js`  | Handles user login            |
| `/files`      | `FileList.js` | Displays files list           |
| `/upload`     | `UploadFile.js` | Allows uploading files       |

### Example Configuration in `App.js`:
```javascript
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import FileList from './components/FileList';
import UploadFile from './components/UploadFile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/files" element={<FileList />} />
                <Route path="/upload" element={<UploadFile />} />
            </Routes>
        </Router>
    );
}

export default App;
```

---

## 7. Error Handling

### **Global Error Handling**
- **Description**: Errors during API calls or rendering are caught and displayed to the user.
- **Implementation**:
  - API errors are caught in `services/api.js`.
  - Components display error messages when an API call fails.

### **Example Error Handling**
#### Displaying Errors in `FileList.js`:
```javascript
const handleDownload = async (fileId) => {
    try {
        await downloadFile(fileId);
    } catch (err) {
        setError('Failed to download the file.');
    }
};
```

### **Displaying Global Errors**
Use state to manage error messages and conditionally render them:
```javascript
{error && <p style={{ color: 'red' }}>{error}</p>}
```

---

This documentation covers all key aspects of the frontend application. Let me know if further details or clarifications are needed!

