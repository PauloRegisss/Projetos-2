FROM oven/bun:1 AS build

WORKDIR /app

COPY package.json bun.lock* ./
COPY apps/frontend/package.json ./apps/frontend/package.json

RUN bun install --frozen-lockfile

COPY . .

ARG WAKU_PUBLIC_BACKEND_URL=http://localhost:8000
ENV WAKU_PUBLIC_BACKEND_URL=${WAKU_PUBLIC_BACKEND_URL}

RUN bun run --filter './apps/frontend' build

FROM oven/bun:1-slim AS runtime

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["bun", "run", "--filter", "./apps/frontend", "start"]
