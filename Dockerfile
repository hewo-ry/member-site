FROM node:24.15.0-alpine AS build

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY .yarn .yarn
COPY .yarnrc.yml package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

ARG ORG_THEME

RUN yarn build


FROM gcr.io/distroless/nodejs24-debian13:nonroot AS runner
LABEL maintainer="Vuosoft / Ville Nupponen <ville.nupponen@hewo.fi>"

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

#COPY --from=build /app/public ./public
COPY --from=build --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=build --chown=nonroot:nonroot /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["server.js"]
