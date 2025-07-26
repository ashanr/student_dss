# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including development dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create data directory for SQLite
RUN mkdir -p /app/data

# Expose port 3000 to match docker-compose configuration
EXPOSE 3000

# Set command to initialize DB and then run the app
CMD ["sh", "-c", "node ./scripts/initializeDatabase.js && npm run dev"]
