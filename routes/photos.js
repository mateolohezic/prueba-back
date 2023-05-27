const express = require('express');
const router = express.Router();
const { uploadFile, getPhoto } = require('../controllers/photos');

router.post('/upload-photo', uploadFile);
router.get('/get-photo/:token', getPhoto);

module.exports = router;