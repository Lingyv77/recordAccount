const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  matter: {
    type: String,
    required: true
  },
  time: Date,
  type: {
    type: Number,
    default: -1,
  },
  number: {
    type: Number,
    default: 0
  },
  remark: String
});

const RecordModel = mongoose.model('records', RecordSchema);

module.exports = RecordModel;