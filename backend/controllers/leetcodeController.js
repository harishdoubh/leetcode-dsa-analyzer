const axios = require('axios');
const User = require('../models/User');

exports.getProgress = async (req, res) => {
  try {
    const { username } = req.params;
    
    // In a real app we would use an unofficial LeetCode API like 'https://leetcode-stats-api.herokuapp.com/'
    // or GraphQL queries. Here we use an unofficial API.
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    
    if (response.data.status === 'success') {
      return res.json(response.data);
    } else {
      // Mock Data if API fails
      return res.json({
        totalSolved: 145,
        totalQuestions: 3000,
        easySolved: 50,
        totalEasy: 800,
        mediumSolved: 80,
        totalMedium: 1500,
        hardSolved: 15,
        totalHard: 700,
        ranking: 34567,
        contributionPoints: 120,
        reputation: 5,
        submissionCalendar: {
          "1704067200": 2,
          "1704153600": 3,
          "1704240000": 1,
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching LeetCode data', error: error.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    // Generate some mock leaderboard
    const users = await User.find().select('username leetcodeUsername targetGoal');
    const leaderboard = users.map((user, index) => ({
      username: user.username,
      leetcodeUsername: user.leetcodeUsername || 'Not connected',
      solved: Math.floor(Math.random() * 500),
      rank: index + 1
    })).sort((a, b) => b.solved - a.solved);
    
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
  }
};

exports.getWeakTopics = async (req, res) => {
  try {
    // Mocking AI-based weak topic suggestions
    const topics = ['Dynamic Programming', 'Graph', 'Trees', 'Sliding Window', 'Backtracking'];
    // Randomly pick two
    const weakTopics = [
      { topic: topics[Math.floor(Math.random() * topics.length)], confidence: '85%', suggestion: 'Solve at least 5 medium problems.' },
      { topic: topics[Math.floor(Math.random() * topics.length)], confidence: '72%', suggestion: 'Review fundamental algorithms.' }
    ];
    res.json(weakTopics);
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing weak topics', error: error.message });
  }
};
