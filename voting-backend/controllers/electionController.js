const Election = require('../models/Election');

// Admin only: create a new election
exports.createElection = async (req, res) => {
  try {
    const { title, description, startsAt, endsAt, candidates } = req.body;
    if (!title || !startsAt || !endsAt || !Array.isArray(candidates) || candidates.length < 2) {
      return res.status(400).json({ error: 'Title, start/end dates, and at least 2 candidates required' });
    }

    const election = await Election.create({
      title,
      description,
      startsAt,
      endsAt,
      candidates,
      createdBy: req.user.id
    });
    res.status(201).json(election);
  } catch (err) {
    console.error('Create Election Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Anyone (voter or admin): list all elections
exports.getElections = async (req, res) => {
  try {
    const elections = await Election.find().sort({ startsAt: 1 });
    res.json(elections);
  } catch (err) {
    console.error('Get Elections Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin only: update an election
exports.updateElection = async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);
    if (!election) return res.status(404).json({ error: 'Election not found' });

    Object.assign(election, req.body);
    await election.save();
    res.json(election);
  } catch (err) {
    console.error('Update Election Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin only: delete an election
exports.deleteElection = async (req, res) => {
  try {
    const election = await Election.findByIdAndDelete(req.params.id);
    if (!election) return res.status(404).json({ error: 'Election not found' });
    res.json({ message: 'Election deleted' });
  } catch (err) {
    console.error('Delete Election Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
