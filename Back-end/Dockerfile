FROM node:20-alpine AS build

# Install OpenSSL (needed by Prisma) and ts-node (for seed script)
RUN apk add --no-cache openssl

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./
RUN yarn install

# Copy Prisma schema and generate the client
COPY prisma ./prisma/
RUN yarn prisma generate

# Copy the rest of the code
COPY . .

# Build TypeScript
RUN yarn build

EXPOSE 8000

USER node

# Run migrations, seed, then start the dev server
CMD yarn prisma migrate deploy && yarn prisma db seed && yarn dev --host 0.0.0.0