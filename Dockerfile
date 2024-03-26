FROM node:20-alpine3.19 as builder

WORKDIR /app

COPY package.json package-lock.json /app

RUN set -eux; \
    npm ci

COPY . /app

RUN set -eux; \
    npm run build

FROM nginx:alpine3.18

LABEL org.opencontainers.image.authors="RouteLink <support@routelink.ru>" \
    org.opencontainers.image.licenses="MIT" \
    org.opencontainers.image.title="RouteLink Client" \
    org.opencontainers.image.description="React based client application"

COPY --from=builder /app/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]