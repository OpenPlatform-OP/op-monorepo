FROM node:18-alpine3.16 AS base

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install -g pnpm
RUN pnpm install --prod

COPY dist/apps/web-api .

FROM node:18-alpine3.16 AS runner

WORKDIR /app

COPY --from=base /app .

CMD ["node", "main.js"]
