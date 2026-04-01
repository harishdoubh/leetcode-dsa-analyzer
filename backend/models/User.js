const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  leetcodeUsername: { type: String },
  targetGoal: { type: Number, default: 300 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
