// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';


function FileUpload({ category, onFileAdded  }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile === null) {
      alert('Please select a file before uploading.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Update the API endpoint URL based on the category
      const apiUrl = `http://localhost:3001/api/files/${category}`;
      await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
      onFileAdded();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;




