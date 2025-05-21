const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const permit = require('../middleware/roleMiddleware');
const {
  createElection,
  getElections,
  updateElection,
  deleteElection
} = require('../controllers/electionController');

// List elections (any authenticated user)
router.get('/', auth, getElections);

// Admin-only routes
router.post('/', auth, permit(['admin']), createElection);
router.put('/:id', auth, permit(['admin']), updateElection);
router.delete('/:id', auth, permit(['admin']), deleteElection);

module.exports = router;
