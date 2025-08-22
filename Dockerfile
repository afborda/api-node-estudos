# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including drizzle-kit for migrations)
RUN npm ci

# Copy application files
COPY src ./src
COPY drizzle ./drizzle
COPY drizzle.config.ts ./
COPY tsconfig.json ./

# Set environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Run the application with tsx
CMD ["npx", "tsx", "src/server.ts"]