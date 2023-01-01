const router = require('express').Router();
const fileController = require('../controller/fileController');

router.post(
  '/',
  fileController.upload.single('file'),
  fileController.uploadFile
);
router.get('/:fileid', fileController.downloadFile);

module.exports = router;
