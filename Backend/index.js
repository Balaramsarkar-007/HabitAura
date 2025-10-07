const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('./auth/auth');
const habit = require('./habits/habits');
const {connectDB, isDBConnected} = require('./config/database');
const {startReminderScheduler} = require('./config/reminderShedulserService');

dotenv.config();

// middlewares
app.use(cors({
  origin: process.env.BASE_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(express.json());
app.use(cookieParser());

// db connection
// Initialize database connection (non-blocking)
connectDB().then(() => {
  if (isDBConnected()) {
    startReminderScheduler();
  }
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});

// routes
app.use('/api/auth', auth);
app.use('/api/habit', habit);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use((req, res) => {
    res.status(404).json({error: "Route not found", path: req.originalUrl});
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success : false,
    error : err.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});