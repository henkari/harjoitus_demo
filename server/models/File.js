// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  
  filename: String,
  category: String,
  description:String,
  date:String
});

module.exports = mongoose.model('File', fileSchema);
