# Step 1: Build the frontend application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

RUN yarn

# Copy the rest of the project files
COPY . .

# Build the app
RUN yarn build

# Step 2: Serve the frontend with Nginx
FROM nginx:alpine

# Copy the build output from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (Nginx default)
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
