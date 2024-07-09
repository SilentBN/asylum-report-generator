const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/download-csv', (req, res) => {
  const filePath = path.join(
    __dirname,
    '..',
    'data',
    'COW2021001887-I589Data.csv'
  );

  console.log('Attempting to access file:', filePath);

  if (fs.existsSync(filePath)) {
    console.log('File exists, attempting to download...');
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
