
# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
COPY app/package.json ./app/

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/app/package.json ./app/
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app/node_modules ./app/node_modules
COPY --from=builder /app/app/.next ./app/.next
COPY --from=builder /app/app/public ./app/public
COPY --from=builder /app/app/prisma ./app/prisma

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
