
# Deployment Guide for Jyotirlinga Temples Web Application

This guide provides instructions for deploying the Jyotirlinga Temples web application in different environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Database Migrations](#database-migrations)

## Prerequisites

Before deploying the application, ensure you have the following:

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- Git
- Docker and Docker Compose (for containerized deployment)

## Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | `postgresql://username:password@localhost:5432/jyotirlinga_db?schema=public` |
| NEXT_DIST_DIR | Directory for Next.js build output | `.next` |
| NEXT_OUTPUT_MODE | Next.js output mode | `standalone` |
| NODE_ENV | Node environment | `development`, `production` |

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/venkatkrish78/jothirlinga.git
   cd jothirlinga
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database (if needed):
   ```bash
   npx prisma db seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Access the application at http://localhost:3000

## Docker Deployment

1. Make sure Docker and Docker Compose are installed on your system.

2. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

3. The application will be available at http://localhost:3000

4. To stop the containers:
   ```bash
   docker-compose down
   ```

## Production Deployment

### Option 1: Standalone Server

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

### Option 2: Using PM2 (Process Manager)

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Start the application with PM2:
   ```bash
   pm2 start npm --name "jyotirlinga-app" -- start
   ```

4. Configure PM2 to start on system boot:
   ```bash
   pm2 startup
   pm2 save
   ```

### Option 3: Using a Reverse Proxy (Nginx)

1. Install and configure Nginx:
   ```bash
   sudo apt-get install nginx
   ```

2. Create an Nginx configuration file:
   ```
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Enable the configuration and restart Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/jyotirlinga /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Database Migrations

### Running Migrations

```bash
# Development environment
npx prisma migrate dev

# Production environment
npx prisma migrate deploy
```

### Creating a New Migration

```bash
npx prisma migrate dev --name migration_name
```

### Resetting the Database

```bash
npx prisma migrate reset
```

## Troubleshooting

- **Database Connection Issues**: Verify your DATABASE_URL in the .env file and ensure the PostgreSQL server is running.
- **Build Errors**: Check for any TypeScript errors or missing dependencies.
- **Runtime Errors**: Check the application logs for detailed error messages.
