# Use the official Bun image (includes Node, npm, etc.)
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY app/package.json app/bun.lock* ./

# Install dependencies
RUN bun install

# Expose default dev port
EXPOSE 5173

# Default command: interactive shell
CMD ["bash"]