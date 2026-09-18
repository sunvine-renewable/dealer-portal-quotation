# Multi-stage build for React Vite Application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci || npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

ENV PORT=80
EXPOSE 80

# Copy built static files to Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx template for dynamic PORT and SPA routing
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]
