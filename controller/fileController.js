const AppError = require('./../utils/AppError');
const multer = require('multer');
const baseUrl = process.env.BASE_URL;
const FilesModel = require('./../models/files');
const fileSizeLimit = process.env.FILE_SIZE_LIMIT;
const storage = multer.diskStorage({
  destination: (req, res, cb) => cb(null, 'dbStorage/'),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
      file.originalname
    }`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
}).single('file');

exports.uploadFile = async (req, res, next) => {
  upload(req, res, async (err) => {
    const file = req.file;
    console.log('Uploaded file\n', file);
    if (!file)
      return next(new AppError(404, 'No file found. Please upload a file'));

    // file size exceeds limit
    if (file.size >= fileSizeLimit)
      return next(new AppError(404, 'File size exceeded limit'));

    if (err) {
      err.message = err.message || 'Something went wrong';
      return next(new AppError(500, err.message));
    }

    console.log(file);
    // Save the record in DB
    const response = await FilesModel.create({
      filename: file.filename,
      size: file.size,
      path: file.path,
      fileId: `${Date.now()}-${Math.round(Math.random() * 1e9)}-${Math.round(
        Math.random() * 1e9
      )}`,
    });
    console.log('Saved FileID: ', response.fileId);
    return res.status(200).json({
      status: 'Success',
      message: 'File Sent',
      downloadUrl: `${baseUrl}/api/v1/files/${response.fileId}`,
    });
  });
};

exports.downloadFile = async (req, res, next) => {
  const fileid = req.params.fileid;
  console.log('Download FileID: ', fileid);
  if (!fileid) next(new AppError(404, 'No file found'));
  try {
    const file = await FilesModel.find({
      fileId: fileid,
    });
    console.log('File found', file);
    if (!file.length) return next(new AppError(404, 'No file found'));
    const filePath = `${__dirname}/../${file[0].path}`;
    console.log('Download File path: ', filePath);
    return res.download(filePath);
  } catch (err) {
    return next(new AppError(500, 'Something went wrong'));
  }
};
