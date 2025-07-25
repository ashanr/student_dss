# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Install netcat-openbsd for connection testing
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including development dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Add script to wait for MongoDB and run seeder
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 3000
EXPOSE 3000

# Start the application using the entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
