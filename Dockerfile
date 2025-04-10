FROM node:20.17.0-alpine3.20 AS dev-deps

LABEL org.opencontainers.image.source=https://github.com/ASJordi/web
LABEL org.opencontainers.image.description="personal-website"
LABEL org.opencontainers.image.licenses=MIT

WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20.17.0-alpine3.20 AS build
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.26.2 AS prod

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

RUN apt-get update && apt-get install -y curl --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
CMD curl -f http://localhost || exit 1

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
