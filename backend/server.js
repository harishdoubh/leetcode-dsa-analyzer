const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const leetcodeRoutes = require('./routes/leetcode');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leetcode', leetcodeRoutes);

const { MongoMemoryServer } = require('mongodb-memory-server');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/leetcode-tracker')
  .then(() => console.log('MongoDB Connected'))
  .catch(async err => {
    console.warn('Local MongoDB failed. Falling back to in-memory DB...');
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log('In-Memory MongoDB Connected for testing purposes.');
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB:', memErr);
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
