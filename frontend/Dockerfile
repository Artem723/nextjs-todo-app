FROM node:23-alpine3.20 AS base

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY app/package.json .
COPY app/package-lock.json .
RUN npm ci


# DEVELOPMENT STAGE
FROM base AS dev

WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY app/ .
RUN npm install --only=dev

ENV NEXT_TELEMETRY_DISABLED=1

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "dev"]


# BUILDING STAGE
FROM base AS builder

WORKDIR /usr/src/app
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY app/ .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build


# PRODUCTION STAGE
FROM builder AS prod

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/public ./public

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static
USER nextjs

EXPOSE 3000

ENV PORT=3000

EXPOSE 3000

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
# ENV HOSTNAME="0.0.0.0"
# RUN npm install next
# CMD ["npm", "start"]