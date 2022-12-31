const mongoose = require('mongoose');
const filesSchema = mongoose.Schema({
  fileId: {
    type: String,
    required: [true, 'A file must have ID'],
  },
  filename: {
    type: String,
    required: [true, 'A file must have a name'],
  },
  path: {
    type: String,
    required: [true, 'File must have valid path'],
  },
  size: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 600,
    default: Date.now(),
  },
});

const FilesModel = mongoose.model('FilesModel', filesSchema);

module.exports = FilesModel;
