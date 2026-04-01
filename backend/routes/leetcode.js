const express = require('express');
const router = express.Router();
const { getProgress, getLeaderboard, getWeakTopics } = require('../controllers/leetcodeController');
const auth = require('../middleware/auth');

router.get('/progress/:username', auth, getProgress);
router.get('/leaderboard', auth, getLeaderboard);
router.get('/weak-topics/:username', auth, getWeakTopics);

module.exports = router;
