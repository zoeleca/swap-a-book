# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install all dependencies (dev dependencies included)
RUN yarn

COPY prisma ./prisma/

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN yarn prisma generate

# Expose the application port
EXPOSE 8000

# Use a non-root user for security
USER node

# Start the application
CMD ["yarn", "start"]
