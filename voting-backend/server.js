const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Basic route
app.get('/', (req, res) => {
  res.send('Online Voting System API');
});

// // Import routes
// const authRoutes = require('./routes/authRoutes');
// const electionRoutes = require('./routes/electionRoutes');
// const voteRoutes = require('./routes/voteRoutes');

// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/elections', electionRoutes);
// app.use('/api/votes', voteRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
