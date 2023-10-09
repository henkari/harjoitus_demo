// routes/files.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File');
const router = express.Router();

// Set up Multer to save uploaded files to respective directories
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine the destination based on the route
    let destinationPath;
    if (req.path === '/sopimus') {
      destinationPath = 'uploads/sopimus';
    } else if (req.path === '/lasku') {
      destinationPath = 'uploads/lasku';
    } else {
      // Default destination if the path is not recognized
      destinationPath = 'uploads/default';
    }

    // Use the destination path to save the file
    cb(null, destinationPath);
    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// API endpoint for uploading files
router.post('/sopimus', upload.single('file'), async (req, res) => {
  // Handle file upload for 'sopimus' category
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
}

const fileData = new File({
    filename: req.file.originalname,
    category:'sopimus',
    
});

try {
    await fileData.save();
    return res.status(200).json({ message: 'File uploaded successfully' });
} catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
});

router.post('/lasku', upload.single('file'), async (req, res) => {
  // Handle file upload for 'lasku' category
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
}

const fileData = new File({
    filename: req.file.originalname,
    category:'lasku'
});

try {
    await fileData.save();
    return res.status(200).json({ message: 'File uploaded successfully' });
} catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Internal server error' });
}
});

// Define routes to fetch files by category 
router.get('/:category', async (req, res) => {
    const category = req.params.category;
    try {
      const files = await File.find({ category: category });
      if (!files || files.length === 0) {
        return res.status(404).json({ error: 'No files found for the specified category' });
      }
        res.status(200).json(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});



// File download route
router.get('/download/:category/:filename', (req, res) => {
    
    const category = req.params.category;
    const filename = req.params.filename;
    const destinationPath = path.join('uploads', category); // Updated
    console.log(destinationPath)
    const filePath = path.join(destinationPath, filename); // Updated
    res.download(filePath);
});

module.exports = router;
