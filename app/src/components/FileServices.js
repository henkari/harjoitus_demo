
import axios from 'axios';

const fetchFiles = async (category) => {
  try {
    const apiUrl = `http://localhost:3001/api/files/${category}`;
    console.log('Fetch Files URL:', apiUrl)
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

const downloadFile = async (filename, category) => {
  try {
    const apiUrl = `http://localhost:3001/api/files/download/${category}/${filename}`;
    console.log('Download File URL:', apiUrl)
    const response = await axios.get(apiUrl, { responseType: 'blob' });
    return response.data;
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

const deleteFile = async (fileId) => {
  try {
    const response = await axios.delete(`/api/files/delete/${fileId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

export { fetchFiles, downloadFile, deleteFile };


