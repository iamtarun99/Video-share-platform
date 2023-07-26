# syntax=docker/dockerfile:1

# Common Multi-stage Dockerfile for the NestJS monorepo to build separate images for each app

# --- Stage 1: Production vid-gateway ---
FROM node:18-alpine as vid-gateway

WORKDIR /app

# Copy the root package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies for vid-gateway
RUN npm install --production

# Copy the already built files for the vid-gateway
COPY dist/apps/vid-gateway ./vid-gateway

# Start the gateway app
CMD ["node", "vid-gateway/main"]

# Expose microservice-app1's port
EXPOSE 3000

# --- Stage 2: Production vid-browse ---
FROM node:18-alpine as vid-browse

WORKDIR /app

# Copy the root package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies for vid-browse
RUN npm install --production

# Copy the already built files for vid-browse
COPY dist/apps/vid-browse ./vid-browse

# Start vid-browse
CMD ["node", "vid-browse/main"]

# Expose microservice-app1's port
EXPOSE 3001
EXPOSE 3003

# --- Stage 3: Production vid-search ---
FROM node:18-alpine as vid-search

WORKDIR /app

# Copy the root package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies for vid-search
RUN npm install --production

# Copy the already built files for vid-search
COPY dist/apps/vid-search ./vid-search

# Start vid-search
CMD ["node", "vid-search/main"]

# Expose microservice-app1's port
EXPOSE 3002
EXPOSE 3004
