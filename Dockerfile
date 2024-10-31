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


# Wait for services
COPY wait-for-services.sh /wait-for-services.sh
RUN chmod +x /wait-for-services.sh
########

# Copy the built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["/wait-for-services.sh"]
