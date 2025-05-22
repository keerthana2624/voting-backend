const Vote = require('../models/Vote');
const Election = require('../models/Election');

exports.castVote = async (req, res) => {
  const { electionId, candidate } = req.body;
  const voterId = req.user.id;

  try {
    // Check if election exists
    const election = await Election.findById(electionId);
    if (!election) return res.status(404).json({ message: 'Election not found' });

    // Check if user has already voted
    const existingVote = await Vote.findOne({ electionId, voterId });
    if (existingVote) return res.status(400).json({ message: 'You have already voted' });

    // Record vote
    const vote = await Vote.create({ electionId, voterId, candidate });
    res.status(201).json({ message: 'Vote cast successfully', vote });
  } catch (err) {
    console.error('Voting Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getResults = async (req, res) => {
  const { electionId } = req.params;

  try {
    const votes = await Vote.find({ electionId });
    if (votes.length === 0) return res.status(404).json({ message: 'No votes found' });

    // Count votes
    const results = {};
    votes.forEach(vote => {
      results[vote.candidate] = (results[vote.candidate] || 0) + 1;
    });

    res.json({ electionId, results });
  } catch (err) {
    console.error('Results Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
