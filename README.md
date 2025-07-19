# I-Care API

A Node.js REST API for the I-Care application built with Express.js and Prisma ORM.

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm (package manager)

## Quick Start with Docker (Recommended)

### 1. Start Docker
```bash
sudo systemctl start docker
sudo systemctl enable docker  # Auto-start on boot
```

### 2. Run Development Environment
```bash
npm run docker:dev
```

The API will be available at: `http://localhost:8080`
Database will be available at: `localhost:5434`

### 3. Check if Running
```bash
# Check container status
docker ps

# Check API logs
npm run docker:logs

# Test API
curl http://localhost:8080
```

### 4. Stop Development Environment
```bash
npm run docker:dev:down
```

## Available Docker Commands

```bash
# Development
npm run docker:dev          # Start development containers
npm run docker:dev:down     # Stop development containers
npm run docker:logs         # View API logs

# Production
npm run docker:up           # Start production containers
npm run docker:down         # Stop production containers

# Database
npm run docker:db:migrate   # Run database migrations
npm run docker:db:studio    # Open Prisma Studio
```

## Local Development (Without Docker)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Create `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/icare_db"
JWT_SECRET="your_jwt_secret_key"
FRONTEND_URL="http://localhost:3000"
API_BASE_URL="http://localhost:5000"
```

### 3. Setup Database
```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Start Development Server
```bash
npm run dev  # Uses nodemon for auto-restart
```

### 5. Start Production Server
```bash
npm start
```

## Project Structure

```
api/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Express middlewares
│   ├── repositories/    # Database layer
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   └── validators/      # Input validation
├── prisma/              # Database schema and migrations
├── uploads/             # File uploads directory
├── docker-compose.yml   # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
├── Dockerfile           # Production Docker image
├── Dockerfile.dev       # Development Docker image
└── index.js             # Application entry point
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `FRONTEND_URL` | Frontend application URL | `http://localhost:3000` |
| `API_BASE_URL` | API base URL | `http://localhost:5000` |
| `PORT` | Server port | `5000` |

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/upload-avatar` - Upload profile image

## Troubleshooting

### Port Already in Use
If you get "port already in use" error:
```bash
# Check what's using the port
sudo lsof -i :8080

# Kill the process
sudo kill <PID>
```

### Docker Issues
```bash
# Clean up Docker
docker system prune -f

# Rebuild containers
npm run docker:dev -- --build
```

### Database Issues
```bash
# Reset database
npm run docker:db:migrate

# View database
npm run docker:db:studio
```

## Development

### Adding New Features
1. Create controllers in `src/controllers/`
2. Add routes in `src/routes/`
3. Implement business logic in `src/services/`
4. Add database operations in `src/repositories/`
5. Update Prisma schema if needed

### Database Changes
1. Update `prisma/schema.prisma`
2. Run migration: `npx prisma migrate dev`
3. Generate client: `npx prisma generate`