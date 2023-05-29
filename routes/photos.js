const express = require('express');
const router = express.Router();
const { uploadFile, getPhoto, getPhotoId } = require('../controllers/photos');

router.post('/upload-photo', uploadFile);
router.get('/get-photo/:token', getPhoto);
router.get('/get-photo-id/:id', getPhotoId);

module.exports = router;