const express = require('express');
const router = express.Router();

const {localFileUpload, imageUpload, videoUpload, ImageSizeReducer} = require('../Controllers/uploadfile');

router.post('/localFileUplaod',localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/ImageSizeReducer', ImageSizeReducer);
module.exports = router;