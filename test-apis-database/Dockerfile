FROM node:22.22.0

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Run compiled JS
CMD ["node", "dist/src/server.js"]
