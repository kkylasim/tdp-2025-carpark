# Stage 1: Build the Angular SSR app
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: Run with Node
FROM node:20-slim

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 4000
CMD ["node", "dist/carpark-app/server/server.mjs"]
