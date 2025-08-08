# React Docker file

# Builder stage
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build

# Production Stage
FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

COPY . .

EXPOSE 4173

CMD ["npm", "run", "preview"]
