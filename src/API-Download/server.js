// Import required modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

// Route to handle CSV file download
app.get('/api/download-csv', (req, res) => {
  // Define the path to the CSV file
  const filePath = path.join(
    __dirname,
    '..',
    'data',
    'COW2021001887-I589Data.csv'
  );

  console.log('Attempting to access file:', filePath);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    console.log('File exists, attempting to download...');
    // Initiate file download
    res.download(filePath, 'COW2021001887-I589Data.csv', err => {
      if (err) {
        console.error('Error during file download:', err);
        res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
    });
  } else {
    console.error('File not found:', filePath);
    res.status(404).send({
      message: 'File not found.',
    });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
