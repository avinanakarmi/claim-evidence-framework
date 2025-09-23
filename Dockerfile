# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the frontend folder
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend application code
COPY claim-evidence-framework/ .

# Build the React app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
