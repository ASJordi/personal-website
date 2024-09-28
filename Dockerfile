FROM node:20.17.0-alpine3.20 AS dev-deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM node:20.17.0-alpine3.20 AS build
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1.26.2 AS prod
EXPOSE 80
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]