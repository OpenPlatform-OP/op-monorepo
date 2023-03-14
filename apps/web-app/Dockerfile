FROM node:18-alpine3.16 AS base

WORKDIR /app

COPY dist/apps/web-app/package.json .
COPY pnpm-lock.yaml .

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install -g pnpm
RUN pnpm install

COPY dist/apps/web-app .

FROM node:18-alpine3.16 AS runner

ENV HOST 0.0.0.0

WORKDIR /app

COPY --from=base /app .

CMD ["npx", "next", "start"]
