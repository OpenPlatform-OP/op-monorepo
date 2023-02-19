FROM node:16 AS builder

ARG NODE_ENV

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build-api

#

FROM node:16

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist/apps/web-api .
COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .

CMD ["node", "main.js"]
