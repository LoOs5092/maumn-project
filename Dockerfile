# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Make sure node_modules binaries are executable
RUN chmod -R +x node_modules/.bin

# Expose the port the app runs on
EXPOSE 3000

# Start the app using nodemon (or node for production)
CMD ["npm", "run", "dev"]
