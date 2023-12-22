import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import './Files.css'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ListFiles({ category, onFileOpened }) {
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const[updatedFile, setUpdatedFile]=useState({description:''});
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  useEffect(() => {
    console.log("Category:", category)
    async function fetchFiles() {
      try {
        const apiUrl = `http://localhost:3001/api/files/${category}`;
        console.log("API URL:", apiUrl)
        const response = await axios.get(apiUrl);
        setFiles(response.data);
        } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchFiles();
  }, [category, onFileOpened]);
  
      const handleDownload = async (filename) => {
        try {
        const apiUrl = `http://localhost:3001/api/files/download/${category}/${filename}`;
        const response = await axios.get(apiUrl, { responseType: 'blob' });
        FileDownload(response.data, filename);
        alert('File downloaded successfully');
      
    } catch (error) {
      console.error('Error downloading file:', error);
    } 
    
  }
  const handleLinkClick = (e,filename,fileId, description) => {
    if (e.ctrlKey) {
      e.preventDefault(); 
      setSelectedFile(fileId);
      setUpdatedFile((prev) => {
        return {
          ...prev,
          description: description      
        };
      });
      handleShow()
      console.log(fileId)
      
    } else {
      handleDownload(filename);
    }
  }  
  const updateFile=(e)=>{
    const{value}=e.target
    setUpdatedFile((prev)=>{
      return {...prev, description:value }
    }) 
  }
  const handleUpdate=(updatedFile)=>{
    console.log(updatedFile)
  }
  const deleteFile = (fileId) => {
    axios
     .delete(`/api/files/delete/${fileId}`)
      
     
      .then((response) => {
        console.log(response.data);
        
      if (response.status === 200 || response.status === 204) {
          setFiles(files.filter(file => file._id !== fileId));
          handleClose(); 
        } else {
          
          console.error('Error deleting file:', response.statusText);
      }
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
        
      });
    
    };
    
    return (
    <div>
    <table>
      <thead>
        <tr>
          <th className="file-column">File Name</th>
          <th className="description-column">Description</th>
          <th className="edit-column">Last modified</th>
                  
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          
          <tr key={file._id}>
            <td>
            <a
              href={`http://localhost:3001/api/files/download/${category}/${file.filename}`}
              
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleLinkClick(e,file.filename, file._id, file.description)}
            >
              {file.filename}
              </a>
              </td>
              <td className="description-column">{}</td>
              <td className="description-column">{file.description}</td>
              <td className="description-column">{file.date}</td>
          </tr>     
        ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input
              type="text"
              placeholder="New_description"
              value={updatedFile.description}
              onChange={updateFile}
      />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => deleteFile(selectedFile)}>
                Delete
              </Button>
              <Button variant='primary' onClick={()=>handleUpdate(updatedFile)}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
    
    
  
  );


}

          


export default ListFiles;