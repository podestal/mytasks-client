# MyTasks Client

A React application built with TanStack Router, React Query, and Tailwind CSS, containerized with Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started) (version 20.10 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- [Git](https://git-scm.com/downloads)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd mytasks/client
```

### 2. Build and Start the Docker Container

Build the Docker image and start the container:

```bash
docker-compose up --build
```

This command will:
- Build the Docker image using the `Dockerfile`
- Install all dependencies using Bun
- Start the container and open an interactive shell

### 3. Start the Development Server

Once the container is running, you'll be inside the container shell. Start the development server:

```bash
bun run dev
```

The application will be available at:
- **Local URL**: http://localhost:5173
- **Network URL**: http://0.0.0.0:5173 (accessible from within Docker network)

### Alternative: Run in Detached Mode

If you prefer to run the container in the background:

```bash
# Start container in detached mode
docker-compose up -d --build

# Enter the container
docker-compose exec bun bash

# Start the dev server
bun run dev
```

## Development Workflow

### Accessing the Container

To access the running container:

```bash
docker-compose exec bun bash
```

### Running Commands

All commands should be run inside the container. Common commands:

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Run tests
bun run test

# Lint code
bun run lint

# Format code
bun run format

# Check and fix code (format + lint)
bun run check
```

### Hot Reload

The development server supports hot module replacement (HMR). Changes to your code will automatically reload in the browser.

## Project Structure

```
client/
├── app/                    # Application source code
│   ├── src/               # Source files
│   ├── public/            # Static assets
│   ├── package.json       # Dependencies and scripts
│   └── vite.config.ts     # Vite configuration
├── Dockerfile             # Docker image configuration
├── docker-compose.yml     # Docker Compose configuration
└── .dockerignore          # Files to exclude from Docker build
```

## Docker Commands Reference

### Starting and Stopping

```bash
# Start containers
docker-compose up

# Start containers in background
docker-compose up -d

# Stop containers
docker-compose down

# Rebuild and start
docker-compose up --build

# Stop and remove volumes
docker-compose down -v
```

### Container Management

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs

# View logs with follow
docker-compose logs -f

# Execute command in container
docker-compose exec bun <command>

# Access container shell
docker-compose exec bun bash
```

### Image Management

```bash
# Rebuild image without cache
docker-compose build --no-cache

# Remove unused images
docker image prune
```

## Troubleshooting

### Port Already in Use

If you see an error that port 5173 is already in use:

```bash
# Stop all containers
docker-compose down

# Check if port is in use
lsof -i :5173

# Kill process using the port (if needed)
kill -9 <PID>
```

### Container Won't Start

```bash
# Check container logs
docker-compose logs bun

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Dependencies Not Installing

```bash
# Remove node_modules and reinstall
docker-compose exec bun rm -rf node_modules
docker-compose exec bun bun install
```

### Changes Not Reflecting

The volume mount should automatically sync changes. If not:

```bash
# Restart the container
docker-compose restart

# Or rebuild
docker-compose down
docker-compose up --build
```

### Permission Issues

If you encounter permission issues:

```bash
# Check file permissions
ls -la

# Fix ownership (if needed, adjust user/group)
sudo chown -R $USER:$USER .
```

## Environment Variables

To use environment variables, uncomment and configure in `docker-compose.yml`:

```yaml
env_file:
  - ./app/.env
environment:
  - NODE_ENV=development
```

Create a `.env` file in the `app/` directory with your environment variables.

## Production Build

To build for production:

```bash
# Enter container
docker-compose exec bun bash

# Build
bun run build

# Preview production build
bun run serve
```

## Technology Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [React](https://react.dev/) 19
- **Router**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Testing**: [Vitest](https://vitest.dev/)

## Additional Resources

For more information about the application structure and features, see [app/README.md](./app/README.md).

## Support

If you encounter any issues, please check the troubleshooting section above or open an issue in the repository.

