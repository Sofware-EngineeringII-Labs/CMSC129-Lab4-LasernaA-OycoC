# Backend Dockerfile
FROM node:20-alpine AS backend

WORKDIR /app

# Copy the shared package manifest first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the backend and shared frontend model code used by the API
COPY backend ./backend
COPY frontend ./frontend

EXPOSE 3001
CMD ["npm", "run", "start"]