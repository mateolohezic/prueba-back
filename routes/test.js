const express = require('express');
const router = express.Router();
const { testSection1, testSection2, testSection3, testSection4, testSection5, testSection6 } = require('../controllers/test');
const { verifyUserToken } = require('../middleware/jwt')

router.post('/directivo/seccion1', verifyUserToken, testSection1);
router.post('/directivo/seccion2', verifyUserToken, testSection2);
router.post('/directivo/seccion3', verifyUserToken, testSection3);
router.post('/directivo/seccion4', verifyUserToken, testSection4);
router.post('/directivo/seccion5', verifyUserToken, testSection5);
router.post('/directivo/seccion6', verifyUserToken, testSection6);

module.exports = router;