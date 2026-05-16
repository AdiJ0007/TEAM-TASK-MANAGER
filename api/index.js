// Vercel Serverless Entry Point
// All /api/* requests are routed here by vercel.json
const app = require('../backend/app');

module.exports = app;
