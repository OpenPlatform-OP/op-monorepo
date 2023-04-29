<div style="display: flex; flex-direction: column; align-items: center">
  <span style="font-size: 32px; font-weight: bolder">Open Platform</span>
  <span>
    <img src="https://github.com/OpenPlatform-OP/op-monorepo/actions/workflows/core-FE-ci.yml/badge.svg" />
    <img src="https://github.com/OpenPlatform-OP/op-monorepo/actions/workflows/core-FE-cd.yml/badge.svg" />
    <img src="https://github.com/OpenPlatform-OP/op-monorepo/actions/workflows/core-BE-ci.yml/badge.svg" />
    <img src="https://github.com/OpenPlatform-OP/op-monorepo/actions/workflows/core-BE-cd.yml/badge.svg" />
  </span>
  <span>
    <img src="https://github.com/OpenPlatform-OP/op-monorepo/actions/workflows/sonarcloud-test.yml/badge.svg" />
  </span>
</div>

---

## System Infra

- Web server: `apps/`
  - web-app: The main frontend server, only contains general function about system. Like authentication, authorization...
  - web-api: The backend server for web-api.
  - blog-api:The backend server for blog feature.
- Library: `libs/`
  - base-ui: Some general ui components for having same style in frontend display.
  - model: The view model for backend response type reference and frontend request parameters type reference.
  - nest: Something nest component for reusing, like repository interface.

<br/>

---

## Build step

1. PNPM Install package
  
   ```bash
   npm install -g pnpm
   pnpm install
   ```

2. Add `.env.local`

    - web-app: `apps/web-app/.env.local`

      - Properties
        - ENV: `LOCAL`, `DEV`, `PROD`
        - NEXT_PUBLIC_BACKEND_ENDPOINT: web-api
  
      - Example
  
        ```text
        ENV=LOCAL
        NEXT_PUBLIC_BACKEND_ENDPOINT=http://localhost:4500
        ```

    - web-api: `apps/web-api/.env.local`

      - Properties
        - ENV: `LOCAL`, `DEV`, `PROD`
        - CORE_BE_PORT: which port you want this server host in.
        - DISCORD_OAUTH_CLIENT_ID
        - DISCORD_OAUTH_CLIENT_SECRET
        - DISCORD_OAUTH_REDIRECT_URI: The frontend endpoint and add discord auth route `/auth/discord`. 
        - MONGO_CONNECTION: MongoDB connection string
        - JWT_KEY: JWT private random key.

      - Example

        ```text
        ENV=LOCAL
        CORE_BE_PORT=4500
        DISCORD_OAUTH_CLIENT_ID=1242151251156426
        DISCORD_OAUTH_CLIENT_SECRET=asftsafas14214221
        DISCORD_OAUTH_REDIRECT_URI=http://localhost:3000/auth/discord
        MONGO_CONNECTION=mongodb://......
        JWT_KEY=x3t342t4t23vr2v2t2btn
        ```

3. Run App in local
  
   `pnpm dev`: start all application in local, also provide specific application start command: `pnpm dev:app`, `pnpm dev:api`.
