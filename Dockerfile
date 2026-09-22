# -------- Stage 1: Build --------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm config set fetch-retries 5 \
  && npm config set fetch-retry-mintimeout 20000 \
  && npm config set fetch-retry-maxtimeout 120000 \
  && npm install --no-audit --no-fund

COPY . .

RUN npm run build


# -------- Stage 2: Runtime --------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV NITRO_HOST=0.0.0.0
ENV PORT=8080

COPY --from=builder /app/.output ./.output

USER node

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
