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
# Expose port
EXPOSE 3000

# --- Stage 2: Production vid-browse ---
FROM node:18-alpine as vid-browse

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY dist/apps/vid-browse ./vid-browse
CMD ["node", "vid-browse/main"]
EXPOSE 3001
EXPOSE 3003

# --- Stage 3: Production vid-search ---
FROM node:18-alpine as vid-search

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY dist/apps/vid-search ./vid-search
CMD ["node", "vid-search/main"]
EXPOSE 3002
EXPOSE 3004

# --- Stage 4: Production vid-auth ---
FROM node:18-alpine as vid-auth

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY dist/apps/vid-auth ./vid-auth
CMD ["node", "vid-auth/main"]
EXPOSE 3008
EXPOSE 3009

# --- Stage 5: Production vid-user ---
FROM node:18-alpine as vid-user

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY dist/apps/vid-user ./vid-user
CMD ["node", "vid-user/main"]
EXPOSE 3005
EXPOSE 3006

# --- Stage 6: Production vid-user-gql ---
FROM node:18-alpine as vid-user-gql

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY dist/apps/vid-user-gql ./vid-user-gql
COPY apps/vid-user-gql/src/**/*.graphql ./vid-user-gql
CMD ["node", "vid-user-gql/main"]
EXPOSE 3010
