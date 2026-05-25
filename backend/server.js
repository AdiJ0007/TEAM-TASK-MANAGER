require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await app.dbReady;
    app.listen(PORT, () => {
      console.log(`TaskFlow server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
