// ListFiles.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import FileDownload from 'js-file-download';

function ListFiles({category, onFileOpened }) {
  const [files, setFiles] = useState([]);
  
  useEffect(() => {
    async function fetchFiles() {
      try {
        // Update the API endpoint URL based on the category
        const apiUrl = `http://localhost:3001/api/files/${category}`;
        const response = await axios.get(apiUrl);
        setFiles(response.data);
        onFileOpened();
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchFiles();
  }, [category, onFileOpened]);

  const handleDownload = async (filename) => {
    try {
      // Update the API endpoint URL based on the category
      const apiUrl = `http://localhost:3001/api/files/download/${category}/${filename}`;
      const response = await axios.get(apiUrl, { responseType: 'blob' });
      FileDownload(response.data, filename);
      alert('File downloaded successfully');
      onFileOpened();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a
              href={`http://localhost:3001/api/files/download/${category}/${file.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default behavior of the link
                handleDownload(file.filename);
              }}
            >
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListFiles.propTypes = {
  category: PropTypes.string,
  onFileOpened: PropTypes.func
};

export default ListFiles;
