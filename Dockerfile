# ---- Stage 1: Build Frontend ----
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --prefer-offline
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: Production Server ----
FROM node:20-alpine AS production
LABEL maintainer="yash725"
LABEL description="TaskFlow - Team Task Manager"

WORKDIR /app

# Copy backend dependencies and source
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --only=production --prefer-offline

COPY backend/ ./backend/

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

# Start the backend server (which serves frontend as static files)
CMD ["node", "backend/server.js"]
