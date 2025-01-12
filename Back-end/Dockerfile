FROM node:20-alpine AS build

# Install OpenSSL (for Prisma compatibility)
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
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
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn prisma db seed && yarn dev --host 0.0.0.0"]
