# Use an official Node.js image as the base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your bot’s code into the container
COPY . .

# Build the TypeScript code to JavaScript
RUN npm run build

# Expose any necessary ports (not always required for a bot, but can be useful if you're using a dashboard)
EXPOSE 3000

# Define the command to start your bot (adjust this based on how you start your bot)
CMD ["node", "./build/index.js"]
