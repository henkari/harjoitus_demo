// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileRoutes = require('./routes/files');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb+srv://hkaksone:tTPcznCxDxZnfbAd@cluster0.vmk8px3.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Use the file routes
app.use('/api/files', fileRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
