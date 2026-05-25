require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./config/passport');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Allow all origins in development; lock down in production via env var
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',')
  : true; // true = reflect any origin (safe for public APIs)

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

let connectPromise = null;
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured');
  }

  if (!connectPromise) {
    connectPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log('Connected to MongoDB');
        return mongoose.connection;
      })
      .catch((err) => {
        connectPromise = null;
        console.error('MongoDB connection error:', err);
        throw err;
      });
  }

  return connectPromise;
};

app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({ message: 'Database unavailable' });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    env: process.env.NODE_ENV,
  });
});

// Serve frontend static files in production (non-Vercel deployments like Railway)
if (
  (process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT) &&
  !process.env.VERCEL
) {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  // Catch-all: serve index.html for SPA routing
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else if (!process.env.VERCEL) {
  app.get('/', (req, res) => {
    res.send('TaskFlow API is running...');
  });
}

app.dbReady = connectDB();

module.exports = app;
