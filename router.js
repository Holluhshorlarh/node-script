const express = require('express');
const router = express.Router();
const archiveData = require('./archive');

router.get('/', async (req, res) => {
  try {
    await archiveData();
    res.send('Data archived successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while archiving data.');
  }
});

module.exports = router;
