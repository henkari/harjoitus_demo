
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const File = require('../models/File');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = req.params.category || 'defaultFolder'; 
    const folderPath = path.join('uploads', category); 

    
    if (!fs.existsSync(folderPath)) {
      try {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Folder created: ${folderPath}`);
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }

    cb(null, folderPath); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });


router.post('/:category', upload.single('file'), async (req, res) => {
  // Handle file upload here into the specified folder
  const fileData = new File({
  
    filename: req.file.originalname,
    category:req.params.category,
    description:req.body.description,
    date:req.body.date
  });
  console.log({fileData})
  try {
    await fileData.save();
   return res.status(200).json({ message: 'File uploaded successfully' });
  }catch (error){
    console.log('error loading file',error)
  }
  });

router.get('/:category', async (req, res) => {
  const category = req.params.category;
  const folderPath = path.join('uploads', category);
  
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: 'Folder not found' });
  }
  const files = fs.readdirSync(folderPath);
  
  if (files.length === 0) {
    return res.status(404).json({ error: 'No files found in the specified category' });
  }
  try {
    const files = await File.find({ category: category });
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/delete/:fileId', async (req,res)=>{
  const fileId=req.params.fileId;
  try{
  const deletedfile= await File.findByIdAndDelete(fileId)
  if(!deletedfile){
    return res.status(404).json({message:'file not found'})
  }
  res.status(200).json({message:'file deleted successfully'})
  }catch (error){res.status(500).json({message:'internal server error'})}
})
module.exports = router;
