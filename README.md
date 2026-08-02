
## Development

Prefer working locally? You need Bun — [install Bun](https://bun.sh/docs/installation).

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev
```

## Self-hosting with Coolify

This project includes a `Dockerfile` and `docker-compose.yml` for self-hosting on [Coolify](https://coolify.io) or any Docker-based platform.

### Quick start with Docker

The `Dockerfile` already uses `vite.config.coolify.ts`, which switches the build from Cloudflare Workers to a plain Node.js server.

```sh
# Build the image
docker build -t ruhulqudus-app .

# Run locally
docker run -p 3000:3000 ruhulqudus-app
```

Then open `http://localhost:3000`.

### Deploy on Coolify

1. Push the repository to GitHub/GitLab.
2. In Coolify, create a new **Resource** → **Application** → choose your repository.
3. Set the **Build Pack** to `Dockerfile`.
4. Make sure Coolify exposes port `3000`.
5. Add your domain (e.g. `ruhulqudus.com`) in Coolify → Domains.
6. Deploy.

### Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `NODE_ENV` | `production` | Node environment |
| `PORT` | `3000` | Server port |

### Docker Compose

```sh
docker compose up -d --build
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
