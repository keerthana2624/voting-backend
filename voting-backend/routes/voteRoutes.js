const express = require('express');
const { castVote, getResults } = require('../controllers/voteController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, castVote); // Only logged-in users
router.get('/results/:electionId', getResults); // Publicly viewable

module.exports = router;
