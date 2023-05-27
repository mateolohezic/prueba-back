const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  file: {
    type: String, // Assuming you will store the file path or filename as a string
    required: true,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;