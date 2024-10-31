#!/bin/sh

# Wait for backend service
while ! nc -z backend 8080; do
  echo "Waiting for backend..."
  sleep 2
done

# Wait for gateway service
while ! nc -z gateway 8888; do
  echo "Waiting for gateway..."
  sleep 2
done

echo "All services are up! Starting nginx..."
exec nginx -g "daemon off;"
