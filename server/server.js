// Main entry point for the WebScale backend server

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = require('./config/db');
const pageRoutes = require('./routes/pageRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin:
      process.env.CLIENT_URL || [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'WebScale API is running',
  });
});

// API Routes
app.use('/api/pages', pageRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Export Express app for Vercel
module.exports = app;