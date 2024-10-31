# Stage 1: Build the Vite application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the source code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# WAIT FOR BACKEND AND GATEWAY
RUN apk update && apk add bash

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
###########

# Copy the built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["/wait-for-it.sh", "backend:8080", "-t", "0", "--", "/wait-for-it.sh", "gateway:8888", "-t", "0", "--", "nginx", "-g", "daemon off;"]
