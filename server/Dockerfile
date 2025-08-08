# Express Docker file

FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

FROM node:22-slim

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
