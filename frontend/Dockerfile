# Frontend Dockerfile
FROM node:20-alpine AS frontend

WORKDIR /app

# Copy the shared package manifest first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend app files
COPY frontend ./frontend

EXPOSE 3000
CMD ["npm", "run", "dev:frontend", "--", "--host", "0.0.0.0"]