const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/elections', require('./routes/electionRoutes'));
// const electionRoutes = require('./routes/electionRoutes');
// const voteRoutes = require('./routes/voteRoutes');

// Use routes
app.use('/api/auth', authRoutes);
// app.use('/api/elections', electionRoutes);
// app.use('/api/votes', voteRoutes);

// Default route (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Online Voting System API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
