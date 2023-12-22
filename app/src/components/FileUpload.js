import React, { useState } from 'react';
import axios from 'axios';


function FileUpload({ category, onFileAdded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [lastModifiedDate, setLastModifiedDate] = useState(null);
  const handleFileChange = (e) => {
            
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setLastModifiedDate(file.lastModifiedDate);
      } else {
        setSelectedFile(null);
        setLastModifiedDate(null);
      }
       
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  const handleUpload = async () => {
    console.log(selectedFile)
    console.log(description)
    if (selectedFile === null) {
      alert('Please select a file before uploading.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('description', description);
    formData.append('date', lastModifiedDate);
    try {
      // Update the API endpoint URL based on the category
      const apiUrl = `http://localhost:3001/api/files/${category}`; // Corrected URL
      await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  
  }
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleUpload}>Upload</button>
      
    </div>
  );
}

export default FileUpload;




