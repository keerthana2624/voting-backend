const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  startsAt:    { type: Date,   required: true },
  endsAt:      { type: Date,   required: true },
  candidates: [
    {
      name:  { type: String, required: true },
      info:  { type: String },
      votes: { type: Number, default: 0 }
    }
  ],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Election', electionSchema);
